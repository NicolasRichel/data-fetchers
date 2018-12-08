/**
 * Block Data Fetcher Element
 * 
 * This element is a data fetcher that can be triggered automatically
 * or manually. It fetches data in one single block and dispatch an
 * event when it is done.
 * 
 * Specific Attributes :
 * 
 *   - auto (Optional) :
 *       If present fetch data automatically when the element is attached to the DOM.
 * 
 *   - data-type (Optional) :
 *       Specify the type of data that are fetched.
 *       Currently only 'json' is supported, if another value is given then data will
 *       be treated as plain text.
 * 
 *   - url (Mandatory) :
 *       URL of the data endpoint.
 */

export default class BlockDataFetcher extends HTMLElement {

  constructor() {
    super();
    this.success = false;
    this.status = null;
    this.buffer = [];
    this.addEventListener('click', this.fetchData);
    // Create Shadow DOM
    const btn = document.createElement('button');
    btn.textContent = this.textContent;
    this.attachShadow({mode: 'open'}).appendChild(btn);
  }

  connectedCallback() {
    if (!this.hasAttribute('url') || this.getAttribute('url')==='') {
      console.warn('Block Data Fetcher must have an \'url\' attribute.');
      this.disabled = true;
    } else if (this.hasAttribute('auto')) {
      this.disabled = true;
      this.hidden = true;
      this.fetchData();
    }
  }

  flushBuffer() { this.buffer = []; }

  fetchData() {
    fetch(this.getAttribute('url'), {
      method: 'GET'
    })
    .then((res) => {
      // Set 'success' flag and response status
      this.success = res.ok;
      this.status = res.status;
      // Then return response body
      return res.text();
    })
    .then((body) => {
      // Parse data according to 'data-type'
      const data = this.getAttribute('data-type')==='json' ? JSON.parse(body) : body;
      // Store response data in buffer
      this.buffer.push( data );
      // Notify that data are loaded
      this.notify( data );
    })
    .catch((err) => {
      console.error(err);
    });
  }

  notify(data) {
    this.dispatchEvent(
      new CustomEvent('data-loaded', {
        bubbles: true,
        composed: true,
        detail: {
          data: data
        }
      })
    );
  }



  // Reflect 'disabled' property to attribute
  get disabled() { return this.hasAttribute('disabled'); }
  set disabled(value) {
    if (value) this.setAttribute('disabled', '');
    else this.removeAttribute('disabled');
    this.shadowRoot.querySelector('button').disabled = value;
  }
  // Reflect 'hidden' property to attribute
  get hidden() { return this.hasAttribute('hidden'); }
  set hidden(value) {
    if (value) this.setAttribute('hidden', '');
    else this.removeAttribute('hidden');
    this.shadowRoot.querySelector('button').hidden = value;
  }

}

window.customElements.define('block-data-fetcher', BlockDataFetcher);
