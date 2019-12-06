
(function (root, factory) {
  if (typeof exports === 'object') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define(factory);
  } else {
    root.getYouTubeID = factory();
  }
}(this, function (exports) {

  var youtubeRegEx = /youtu\.?be/;
  var patterns = [
    /youtu\.be\/([^#\&\?]{11})/,  // youtu.be/<id>
    /\?v=([^#\&\?]{11})/,         // ?v=<id>
    /\&v=([^#\&\?]{11})/,         // &v=<id>
    /embed\/([^#\&\?]{11})/,      // embed/<id>
    /\/v\/([^#\&\?]{11})/         // /v/<id>
  ];
  var urlSplitRegEx = /[\/\&\?=#\.\s]/g;
  var elevenCharKeyRegEx = /^[^#\&\?]{11}$/;

  return function (url, opts) {
    if (opts == undefined) {
      opts = {fuzzy: true};
    }

    if (youtubeRegEx.test(url)) {

      // Look first for known patterns
      var i;

      // If any pattern matches, return the ID
      for (i = 0; i < patterns.length; ++i) {
        if (patterns[i].test(url)) {
          return patterns[i].exec(url)[1];
        }
      }

      if (opts.fuzzy) {
        // If that fails, break it apart by certain characters and look 
        // for the 11 character key
        var tokens = url.split(urlSplitRegEx);
        for (i = 0; i < tokens.length; ++i) {
          if (elevenCharKeyRegEx.test(tokens[i])) {
            return tokens[i];
          }
        }
      }
    }

    return null;
  };

}));
