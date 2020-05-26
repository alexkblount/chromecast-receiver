const context = cast.framework.CastReceiverContext.getInstance();
const playerManager = context.getPlayerManager();

const NAME_SPACE = 'urn:x-cast:com.example.cast.mynamespace'; // TODO: change namespace as desired
const ENABLE_DEBUG = true;

const playerElement = document.getElementById('player');


/*** Custom UI Setup (*Not recommended) ***/ // TODO: Uncomment this block if have to use Custom UI.

// const playerData = {};
// const playerDataBinder = new cast.framework.ui.PlayerDataBinder(playerData);
// 
// // Update ui according to player state
// playerDataBinder.addEventListener(
//     cast.framework.ui.PlayerDataEventType.STATE_CHANGED,
//     e => {
//       switch (e.value) {
//         case cast.framework.ui.State.LAUNCHING:
//         case cast.framework.ui.State.IDLE:
//           // Write your own event handling code
//           break;
//         case cast.framework.ui.State.LOADING:
//           // Write your own event handling code
//           break;
//         case cast.framework.ui.State.BUFFERING:
//           // Write your own event handling code
//           break;
//         case cast.framework.ui.State.PAUSED:
//           // Write your own event handling code
//           break;
//         case cast.framework.ui.State.PLAYING:
//           // Write your own event handling code
//           break;
//       }
//     });

/*** Custom UI Setup End ***/


/*** Custom Message ***/

context.addCustomMessageListener(NAME_SPACE, function(customEvent) {
  // handle customEvent.
});

/*** Custom Message End ***/


/*** DRM ***/

// Update playback config licenseUrl according to provided value in load request.
playerManager.setMediaPlaybackInfoHandler((loadRequest, playbackConfig) => {
  if (loadRequest.media.customData && loadRequest.media.customData.licenseUrl) {
    playbackConfig.licenseUrl = loadRequest.media.customData.licenseUrl;
  }
  return playbackConfig;
});

/*** DRM End ***/


/*** Interceptors ***/

// intercept the LOAD request to be able to read in a contentId and get data
playerManager.setMessageInterceptor(
  cast.framework.messages.MessageType.LOAD, loadRequestData => {
    loadRequestData.media.hlsSegmentFormat = cast.framework.messages.HlsSegmentFormat.TS;
    return loadRequestData;
  });

// Intercept the EDIT_AUDIO_TRACKS request
playerManager.setMessageInterceptor(cast.framework.messages.MessageType.EDIT_AUDIO_TRACKS, request => {
  // write logic to convert language codes here
});

// intercept the EDIT_TRACKS_INFO request
playerManager.setMessageInterceptor(cast.framework.messages.MessageType.EDIT_TRACKS_INFO, request => {
  // write logic to convert language codes here
});

/*** Interceptors End ***/

/*** Queue Events ***/

// gets triggered when a queue is loaded.
playerManager.addEventListener(cast.framework.events.EventType.REQUEST_QUEUE_LOAD,
  event => {

  });

playerManager.addEventListener(cast.framework.events.EventType.REQUEST_QUEUE_INSERT,
  event => {

  });

playerManager.addEventListener(cast.framework.events.EventType.REQUEST_QUEUE_UPDATE,
  event => {

  });

playerManager.addEventListener(cast.framework.events.EventType.REQUEST_QUEUE_REMOVE,
  event => {

  });

/*** Queue Events End ***/

/*** Media Events ***/
playerManager.addEventListener(cast.framework.events.EventType.REQUEST_LOAD,
  event => {
    
  });

playerManager.addEventListener(cast.framework.events.EventType.LOADED_METADATA,
  event => {
    
  });

playerManager.addEventListener(cast.framework.events.EventType.PLAYING,
  event => {
    
  });

playerManager.addEventListener(cast.framework.events.EventType.PAUSE,
  event => {
    
  });

playerManager.addEventListener(cast.framework.events.EventType.SEEKING,
  event => {

  });

playerManager.addEventListener(cast.framework.events.EventType.SEEKED,
  event => {

  });

playerManager.addEventListener(cast.framework.events.EventType.TIME_UPDATE,
  event => {
    
  });

playerManager.addEventListener(cast.framework.events.EventType.PLAYER_PRELOADING,
  event => {

  });

playerManager.addEventListener(cast.framework.events.EventType.PLAYER_LOAD_COMPLETE,
  event => { // Select Audio and Text tracks here.
    
  });

// gets triggered when a media in finished, will triggered once for each queue item that finishes.
playerManager.addEventListener(cast.framework.events.EventType.MEDIA_FINISHED,
  event => {

  });

playerManager.addEventListener(cast.framework.events.EventType.MEDIA_STATUS,
  event => {
    // Write your own event handling code, for example
    // using the event.mediaStatus value

  });

playerManager.addEventListener(cast.framework.events.EventType.REQUEST_EDIT_TRACKS_INFO,
  event => {
    if (event.requestData.activeTrackIds.length) {
      enableTextTracksByIds(event.requestData.activeTrackIds);
    }
  });

playerManager.addEventListener(cast.framework.events.EventType.REQUEST_EDIT_AUDIO_TRACKS,
  event => {

  });

playerManager.addEventListener(cast.framework.events.EventType.ERROR,
  event => {
    log(event.error);
  });

/*** Media Events End ***/


/*** Utils ***/

const log = function(msg) {
  if (ENABLE_DEBUG) {
    console.info(msg);
  }
};

/*** Utils End ***/


// Creating a queue on receiver side (if necessary)
// const MyCastQueue = class extends cast.framework.QueueBase {
//   initialize(loadRequestData) {
//     const media = loadRequestData.media;
//     const items = [];
//     //items.push(myCreateItem(media)); // your custom function logic
// 
//     const queueData = new cast.framework.messages.QueueData();
//     queueData.items = items;
// 
//     return queueData;
//   }
// 
//   // nextItems(itemId) {
//   //   return [myCreateNextItem()]; // your custom function logic
//   // }
// };
// 
// const myCastQueue = new MyCastQueue(); // create instance of queue Object

const enableAudioTrackByLanguage = function(lang) {
  const audioTracksManager = playerManager.getAudioTracksManager();

  // Set the first matching language audio track to be active
  audioTracksManager.setActiveByLanguage(lang);
};

const enableAudioTrackById = function(id) {
  const audioTracksManager = playerManager.getAudioTracksManager();

  // Set the first matching language audio track to be active
  audioTracksManager.setActiveById(id);
};

const enableTextTrackByLanguage = function(lang) {
  const textTracksManager = playerManager.getTextTracksManager();

  // Set the first matching language text track to be active
  textTracksManager.setActiveByLanguage(lang);
};

const enableTextTracksByIds = function(ids) {
  const textTracksManager = playerManager.getTextTracksManager();

  // Set the first matching language text track to be active
  textTracksManager.setActiveByIds(ids);
};

const playbackConfig = new cast.framework.PlaybackConfig();

// Sets the player to start playback as soon as there are five seconds of
// media contents buffered. Default is 10.
playbackConfig.autoResumeDuration = 5;

/**
 * A function to customize request to get a caption segment.
 *
 * @param {cast.framework.NetworkRequestInfo} networkReqInfo HTTP(s) Request/Response information.
 */
playbackConfig.captionsRequestHandler = function(networkReqInfo) {

};

/**
 * Handler to process license data. The handler is passed the license data, and returns the modified license data.
 *
 * @param {Uint8Array} licenseData license data
 * @return {Uint8Array}
 */
playbackConfig.licenseHandler = function(licenseData) {
  return licenseData;
};

/**
 * A function to customize request to get a license.
 *
 * @param {cast.framework.NetworkRequestInfo} networkReqInfo HTTP(s) Request/Response information.
 */
playbackConfig.licenseRequestHandler = function(networkReqInfo) {
  const customData = playerManager.getMediaInformation().customData;
  
  if (customData && customData.licenseKeyHeaders) {
    networkReqInfo.headers = playerManager.getMediaInformation().customData.licenseKeyHeaders;
  }
};

/**
 * Handler to process manifest data. The handler is passed the manifest, and returns the modified manifest.
 *
 * @param {String} manifest The manifest string
 * @return {String}
 */
playbackConfig.manifestHandler = function(manifest) {
  return manifest;
};

/**
 * A function to customize request to get a manifest.
 *
 * @param {cast.framework.NetworkRequestInfo} networkReqInfo HTTP(s) Request/Response information.
 */
playbackConfig.manifestRequestHandler = function(networkReqInfo) {
  
};

/**
 * Handler to process segment data. The handler is passed the segment data, and returns the modified segment data.
 *
 * @param {Uint8Array} segment The original segment
 * @return {Uint8Array}
 */
playbackConfig.segmentHandler = function(segment) {
  return segment;
};

/**
 * A function to customize request information to get a media segment.
 *
 * @param {cast.framework.NetworkRequestInfo} networkReqInfo HTTP(s) Request/Response information.
 */
playbackConfig.segmentRequestHandler = function(networkReqInfo) {

};

// Add the receiver side queue to the context if necessary
//context.start({queue: myCastQueue, playbackConfig: playbackConfig});
context.start({
  playbackConfig: playbackConfig
});