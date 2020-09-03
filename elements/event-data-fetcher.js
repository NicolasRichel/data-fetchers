/**
 * Event Data Fetcher
 */

export default class EventDataFetcher extends HTMLElement {

  constructor() {
    super();
    this.success = false;
    this.status = null;
    this.buffer = [];
    this._createShadowDOM();
    this.addEventListener('click', this.fetchData);
  }

  _createShadowDOM() {
    const btn = document.createElement('button');
    btn.textContent = this.textContent;
    this.attachShadow({ mode: 'open' }).appendChild(btn);
  }

  connectedCallback() {
    if (!this.hasAttribute('url') || this.getAttribute('url')==='') {
      console.warn('Event Data Fetcher must have an \'url\' attribute.');
      this.disabled = true;
    } else if (this.hasAttribute('auto')) {
      this.disabled = true;
      this.hidden = true;
      this.fetchData();
    }
  }

  flushBuffer() {
    this.buffer = [];
  }

  fetchData() {
    // Use EventSource to get data from server.
    // See:
    //   - https://developer.mozilla.org/en-US/docs/Web/API/EventSource
    //   - https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
    //   - https://www.html5rocks.com/en/tutorials/eventsource/basics/
  }

  notify(data) {
    this.dispatchEvent(
      new CustomEvent('data-loaded', { data })
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

window.customElements.define('event-data-fetcher', EventDataFetcher);
