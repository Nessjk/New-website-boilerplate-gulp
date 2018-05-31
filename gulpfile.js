var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var responsive = require('gulp-responsive');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var uglify = require('uglify-js');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var input = './sass/*.scss';
var inputJS = './js/*.js';
var output = './css';
var minified = './minified/';


//
// JS files concatenate and compress
//

// If you concat everytime then the files are going to keep on
// getting longer and longer with information duplicating
// so you only want to run it at the end
gulp.task('concat', function(){
    return gulp.src('./js/*.js')
      .pipe(concat('scripts.js'))
      .pipe(gulp.dest('minified'))
})

gulp.task('compress', function() {
  return gulp.src('./minified/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('minified'))
})

//
// Image compression and resizing
// 
gulp.task('images', function () {
  return gulp.src('img/raw/*.{jpg,png}')
    .pipe($.responsive({
      // Convert all images to JPEG format
      '*': [{
        // image-medium.jpg is 375 pixels wide
        width: 375,
        rename: {
          suffix: '-small',
          extname: '.jpg',
        },
      }, {
        // image-large.jpg is 480 pixels wide
        width: 1000,
        rename: {
          suffix: '-large',
          extname: '.jpg',
        },
      }, {
        // image-extralarge.jpg is 768 pixels wide
        width: 1900,
        rename: {
          suffix: '-xxl',
          extname: '.jpg',
        },
            // Do not enlarge the output image if the input image are already less than the required dimensions.
        withoutEnlargement: true,
      }],
      }, {
      // Global configuration for all images
      // The output quality for JPEG, WebP and TIFF output formats
      quality: 80,
      // Use progressive (interlace) scan for JPEG and PNG output
      progressive: true,
      // Strip all metadata
      withMetadata: false,
      // Do not emit the error when image is enlarged.
      errorOnEnlargement: false,
    }))
    .pipe(gulp.dest('img/web'));
});


//
// SASS Options and autoprefixing
// 
var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

gulp.task('sass', function() {
    return gulp
        .src(input)
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest(output))
        .pipe(browserSync.stream());
});

gulp.task('prod', function () {
  return gulp
    .src(input)
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(minified));
});

//
// Launch & Watch
// 
gulp.task('serve', ['sass'], function() {
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });

  gulp.watch("sass/**/*.scss", ['sass']);
  //gulp.watch("js/**/*.js", ['uglify']);
  //gulp.watch("js/**/*.js", ['concat']);
  //gulp.watch("js/**/*.js", ['compress']);
  gulp.watch("img/raw/**/*.{jpg,png}", ['images']);
  gulp.watch("*.html").on('change', browserSync.reload);
});


gulp.task('watch', function() {
  return gulp
    // Watch the input folder for change,
    // and run `sass` task when something happens
    .watch(input, ['sass'])
    //.watch(inputJS, ['uglify'])
    //.watch(inputJS, ['compress'])
    // When there is a change,
    // log a message in the console
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('default', ['serve','images']);

//
// At the end run following commands
//

// For JS //
// run 'gulp concat' to concatenate all scripts in one file called 'scripts.js' found in the 'minified' folder
// run 'gulp compress' to compress/minify all the JS files in the minified folder

// For SASS //
// run 'gulp prod' to compress/minify all the SASS files in the minified folder

