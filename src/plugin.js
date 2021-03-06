import videojs from 'video.js';
import {version as VERSION} from '../package.json';

const Plugin = videojs.getPlugin('plugin');

// Default options for the plugin.
const defaults = {};

/**
 * An advanced Video.js plugin. For more information on the API
 *
 * See: https://blog.videojs.com/feature-spotlight-advanced-plugins/
 */
class Vot extends Plugin {

  /**
   * Create a Vot plugin instance.
   *
   * @param  {Player} player
   *         A Video.js Player instance.
   *
   * @param  {Object} [options]
   *         An optional options object.
   *
   *         While not a core part of the Video.js plugin architecture, a
   *         second argument of options is a convenient way to accept inputs
   *         from your plugin's caller.
   */
  constructor(player, options) {
    // the parent class will add player under this.player
    super(player);

    this.socket = new WebSocket("ws://localhost:4000/socket/websocket");
    this.prev_time = 0

    this.options = videojs.mergeOptions(defaults, options);

    player.ready(() => {
    });


    // https://github.com/videojs/http-streaming
    // https://docs.videojs.com/player

    player.on('pluginsetup', (e, hash) => {

    })

    player.on('loadeddata', (e) => {
      console.log('loadeddata')
      this.event({ type: 'meta', event: 'join' })
    })

    player.on('play', () => {
      this.play_start = Date.now()
      console.log('play')
      console.log('PlayerSize', `${player.currentWidth()}x${player.currentHeight()}`)
      console.log('VideoSize', `${player.videoWidth()}x${player.videoHeight()}`)
      console.log('player.vhs.playlists.master', player.vhs.playlists.master)
      console.log('videoTracks', player.videoTracks())
      console.log('audioTracks', player.audioTracks())

      console.log(1111, videojs.options.html5)

    })

    player.on('pause', () => {
      this.event({ type: 'player', event: 'pause' })
    })

    player.on('timeupdate', (e) => {
      console.log('timeupdate', player.currentTime())
      const round = Math.round(player.currentTime())
      if (this.prev_time == 0) {
        this.event({ type: 'player', event: 'start_time', value: Date.now() - this.play_start })
      }
      if (this.prev_time == 0 || round != this.prev_time) {
        this.event({ type: 'player', event: 'playing', pos: round })
        this.prev_time = round
      }
    })

    player.on('resize', () => {
      console.log('resize')
    })

    player.on('volumechange', () => {
      console.log('volumechange')
    })

    player.on('waiting', () => {
      this.event({ type: 'player', event: 'buffering' })
      console.log('waiting')
    })

    // player.on('progress', () => {
    //   console.log('progress')
    // })

    player.on('enterFullWindow', () => {
      console.log('enterFullWindow')
    })

    player.on('error', () => {
      console.log('error')
      this.event({ type: 'player', event: 'error' })
    })

    // player.on('enterFullWindow', () => {
    //   console.log('enterFullWindow')
    // })

    // player.on('enterFullWindow', () => {
    //   console.log('enterFullWindow')
    // })

    // player.on('enterFullWindow', () => {
    //   console.log('enterFullWindow')
    // })

  }

  event = (event) => {
    this.socket.send(JSON.stringify(event))
  }
}

// Define default values for the plugin's `state` object here.
Vot.defaultState = {};

// Include the version number.
Vot.VERSION = VERSION;

// Register the plugin with video.js.
videojs.registerPlugin('vot', Vot);

export default Vot;
