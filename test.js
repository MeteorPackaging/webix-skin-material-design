'use strict';

var packageName;  // there seems to be no official way of finding out the name of the very package we're testing - http://stackoverflow.com/questions/27180709/in-a-tinytest-test-file-how-do-i-get-the-name-of-the-package

// Check that the font files are downloadable. Meteor places assets at /packages/<packageName>/.
// Only the 'woff' file will be used in modern browsers
['eot', 'svg', 'ttf', 'woff'].forEach(function (fontFormat) {
  ['Roboto-Regular-webfont', 'Roboto-Medium-webfont'].forEach(function (fontVariant) {
    Tinytest.addAsync(fontVariant + '.' + fontFormat + ' font is shipped', function (test, done) {

      // curiously enough, the 'local-test:...' package isn't loaded into Package before calling Tinytest, so we can't do this determination outside this loop
      if (!packageName)
        Object.keys(Package).forEach(function(p) {
          if (p.search(/local-test/) > -1)
            packageName = p.replace('local-test:', '');  // we should stop the loop, but forEach can't do that
        });

      var packagePath = packageName.replace(':', '_');  // e.g. fortawesome_fontawesome

      HTTP.get(
        '/packages/' + packagePath + '/material-design-skin/fonts/' + fontVariant + '.' + fontFormat,
        {
           headers: {
             'Cache-Control': 'no-cache'  // because Meteor has cached fonts even after they were removed from package.js (!) - https://github.com/meteor/meteor/issues/3196
           }
        },
        function callback(error, result) {
          if (error) {
            test.fail({message: 'Font failed to load'});
          } else {
            // if the file is 404, Meteor will redirect to / and return the Meteor.js boilerplate
            test.isTrue(result.content.length > 30000, fontVariant + '.' + fontFormat + ' font could not be downloaded');
          }
  
          done();
        }
      );
    });  
  });
});

// visual check
Tinytest.add('Visual check', function (test) {
  var webixDropZone = document.createElement('div');
  document.body.appendChild(webixDropZone);
  webixDropZone.innerHTML = '<div style="width: 50%; margin: 1em" class="bg_panel_raised">Test passed if this panel looks raised</div>';
  test.ok({message: 'Test passed if the panel looks raised.'});
});
