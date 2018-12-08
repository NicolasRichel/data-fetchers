# Smart Page Load Elements

This repository provide a set of custom HTML elements that are intended
to be used when it is necessary to load a large amount of data provided
by a backend API.

Only 2 elements are under development for now :
- [block-data-fetcher](./elements/block-data-fetcher.js) : a basic 'data-fetcher' element
  that perform a simple XHR (using fetch API) to retrieve data.
- [chunked-data-fetcher](./elements/chunked-data-fetcher.js) : a more sophsticated 'data-fetcher'
  that use the [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
  to get data in a chunked form.


## Contributing

These "data fetchers" are published under the GPLv3 so feel free to use, copy,
redistribute and/or improve it as you like !

(see [LICENSE](./LICENSE) for more details).
