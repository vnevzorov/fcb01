/*
    Cordova projects gulpfile. KDL 20150504
*/

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();
// gulp-load-plugins: https://www.npmjs.com/package/gulp-load-plugins

var browserSync = require('browser-sync').create();
// BrowserSync + GulpJS doc: http://www.browsersync.io/docs/gulp/

var watchList = ["./www/**/*.*", "!./www/lib/**"];
// global watchLIst for the project. It's used bu each watcher to monitor changes.

var changeEvent = function(evt) {
//  Colorized log of a watch event with gulp-util
    $.util.log('File', $.util.colors.cyan(evt.path.replace(new RegExp('/.*(?=/' + __dirname + ')/'), '')), 'was', $.util.colors.magenta(evt.type));
};

function bs_serve(www_path, deb){
//  Launch browser-synk server

    deb = typeof deb !== 'undefined' ? deb : 400; // set default vakue
    browserSync.init({
    // options doc: http://www.browsersync.io/docs/options/
        server: www_path,         // Serve files from the app directory
        browser: "google chrome", // browser: ["google chrome", "firefox"]
        ghostMode: false,         // Clicks, Scrolls & Form inputs on any device will be mirrored to all others.
        online: false,            // Will not attempt to determine your network status, assumes you're OFFLINE
        open: "local",            // Open the localhost URL
        //open: "ui",             // Open the UI - since 2.0.0
        notify: false,            // The small pop-over notifications in the browser are not always needed/wanted.
        reloadDebounce: deb,      // Wait "deb" seconds after a reload event before allowing more.
        injectChanges: true,      // Inject CSS changes
    });
};


/***>  default   *************************************************
    Shows a list of the commands avaliable  
******************************************************************/
gulp.task('default', $.taskListing.withFilters(null, 'default'));

/***>  serve   ***************************************************
    Runs a live updating local server, opens it in Google Chrome  
******************************************************************/
gulp.task('serve', function() {
  bs_serve("./www");
  gulp.watch(watchList, function(evt) {  
    browserSync.reload();
    changeEvent(evt);
  });
});

/**
* This is a different version of the same command which works on Linux.
* Apparently Linux does not like browser: "google chrome" property.
*/
gulp.task('serve1', function() {
    browserSync.init({
        server: {
            baseDir: "./www"
        },
	injectChanges: true      // Inject CSS changes
    });
    gulp.watch(watchList, function(evt) {  
    	browserSync.reload();
    	changeEvent(evt);
    });
});
