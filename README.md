# Smart Page Load Elements

This repository provide a set of custom HTML elements that are intended
to be used when it is necessary to load a large amount of data provided
by a backend API.

Only 2 elements are under development for now :
- [block-data-load](./elements/block-data-load.js) : a basic 'data-loader' element
  that perform a simple XHR (using fetch API) to retrieve data.
- [chunked-data-load](./elements/chunked-data-load.js) : a more sophsticated 'data-loader'
  that use the [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
  to get data in a chunked form.


## Contributing

These "data loader" are published under the GPLv3 so feel free to use, copy,
redistribute and/or improve it as you like !

(see [LICENSE](./LICENSE) for more details).
