# videojs-vot

Video observability tool for videojs.

## Installation

```sh
npm install --save @vot/videojs-vot
```

## Usage

To include videojs-vot on your website or web application, use any of the following methods.

### `<script>` Tag

This is the simplest case. Get the script in whatever way you prefer and include the plugin _after_ you include [video.js][videojs], so that the `videojs` global is available.

```html
<script src="//path/to/video.min.js"></script>
<script src="//path/to/videojs-vot.min.js"></script>
<script>
  var player = videojs('my-video');

  player.vot();
</script>
```

### Browserify/CommonJS

When using with Browserify, install videojs-vot via npm and `require` the plugin as you would any other module.

```js
var videojs = require('video.js');

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
require('@vot/videojs-vot');

var player = videojs('my-video');

player.vot();
```

### RequireJS/AMD

When using with RequireJS (or another AMD library), get the script in whatever way you prefer and `require` the plugin as you normally would:

```js
require(['video.js', '@vot/videojs-vot'], function(videojs) {
  var player = videojs('my-video');

  player.vot();
});
```

## License

Apache-2.0. Copyright (c) abc3 &lt;abc3erl@protonmail.com&gt;


[videojs]: http://videojs.com/
