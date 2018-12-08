/**
 * Chunked Data Fetcher Element
 * 
 * Specific Attributes :
 * 
 *   - auto (Optional) :
 *       If present fetch data automatically when the element is attached to the DOM.
 * 
 *   - url (Mandatory) :
 *       URL of the data endpoint.
 */

export default class ChunkedDataFetcher extends HTMLElement {

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
      console.warn('Chunked Data Fetcher must have an \'url\' attribute.');
      this.disabled = true;
    } else if (this.hasAttribute('auto')) {
      this.disabled = true;
      this.hidden = true;
      this.fetchData();
    }
  }

  flushBuffer() { this.buffer = []; }

  fetchData() {
    const socket = new WebSocket(this.getAttribute('url'));
    socket.addEventListener('open', (e) => {
      console.log('WS Connection opened.');
      socket.send(JSON.stringify({ type: "data" }));
    });
    socket.addEventListener('message', (e) => {
      console.log('Recieved message : ', e.data);
    });
    socket.addEventListener('close', (e) => {
      console.log('WS Connection closed.');
    });
  }

  notify(data) {
    this.dispatchEvent(
      new CustomEvent('data-loaded', {
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

window.customElements.define('chunked-data-fetcher', ChunkedDataFetcher);
