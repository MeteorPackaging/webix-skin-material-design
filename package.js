// Package metadata file for Meteor.js. Maintainer: @dandv.
'use strict';

var packageName = 'webix:skin-material-design';  // http://atmospherejs.com/webix/skin-material-design
var gitHubPath = 'webix-hub/material-design-skin';  // https://github.com/webix-hub/material-design-skin
var where = 'client';  // where to install: 'client' or 'server'. For both, pass nothing.

var version = '1.0.0';

Package.describe({
  name: packageName,
  summary: 'Material Design skin for Webix UI',
  version: version,
  git: 'https://github.com/MeteorPackaging/webix-skin-material-design.git',
  documentation: 'README.md'
});


Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.0');
  api.use('less', where);  // for https://github.com/webix-hub/material-design-skin/blob/master/skins/debug/material.less
  
  api.imply('webix:webix@2.3.8');
  
  // add the Webix font files
  ['Roboto-Regular-webfont', 'Roboto-Medium-webfont'].forEach(function (font) {
    api.addFiles([
      // we bundle all font files, but the client will request only one of them via the CSS @font-face rule
      'material-design-skin/fonts/' + font + '.eot',   // IE8 or older only understands EOT. IE9+ will read it too because it loads the first occurrence of `src`
      'material-design-skin/fonts/' + font + '.svg',   // SVG fallback for iOS < 5 - http://caniuse.com/#feat=svg-fonts, http://stackoverflow.com/a/11002874/1269037
      'material-design-skin/fonts/' + font + '.ttf',   // Android Browers 4.1, 4.3 - http://caniuse.com/#feat=ttf
      'material-design-skin/fonts/' + font + '.woff',  // Most modern browsers

      'material-design-skin/skins/debug/material.less'
    ], where);
  });
});

Package.onTest(function (api) {
  api.use(packageName, where);
  api.use(['tinytest', 'http'], where);

  api.addFiles('test.js', where);
});
