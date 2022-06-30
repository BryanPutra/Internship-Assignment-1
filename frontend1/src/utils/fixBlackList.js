// copy this code snippet here and replace sharedBlacklist in blacklist.js 
// directory: projectFolder/node_modules/metro-config/src/defaults/blacklist.js
// when encountering an invalid regular expression error 
var sharedBlacklist = [
    /node_modules[\/\\]react[\/\\]dist[\/\\].*/,
    /website\/node_modules\/.*/,
    /heapCapture\/bundle\.js/,
    /.*\/__tests__\/.*/
];