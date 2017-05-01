"use strict";
const gulp = require('gulp');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const jade = require('gulp-jade');
const concat = require('gulp-concat');







let config = {

    build: {

        css: 'build/css',
        html: 'build',
        js: 'build/js',
        libraries:'build/css/libraries/bootstrap',
        librariesJS:'build/js/angular'

    },
    all: {
        html: 'src/index.jade',
        less: 'src/assets/stylesheets/**/*.less',
        jade: 'src/assets/templates/*.jade',
        js: 'src/app/**/*.js',
        libraries:'node_modules/bootstrap/dist/**/*.*',
        librariesJS: ['node_modules/angular/**/*.*', 'node_modules/angular-route/**/*.*']

    }

};





//compile-less
gulp.task('compile-less', ()=>{

    gulp.src(config.all.less)
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(config.build.css));

});

//compile-jade
gulp.task('compile-jade', ()=>{

    gulp.src(config.all.html)
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest(config.build.html));

});

gulp.task('compile-template', ()=>{

    gulp.src(config.all.jade)
    .pipe(jade({
        pretty: true
    }))
    .pipe(gulp.dest('./build/templates'));

});

gulp.task('java-script', ()=>{

   gulp.src(config.all.js)
       .pipe(gulp.dest(config.build.js));

});

gulp.task('librariesCss', ()=>{

    gulp.src(config.all.libraries)
        .pipe(gulp.dest(config.build.libraries));

});

gulp.task('librariesJS', ()=>{

   gulp.src(config.all.librariesJS)
       .pipe(gulp.dest(config.build.librariesJS));

});


gulp.task('watcher', ()=>{

    gulp.watch(config.all.less, ['compile-less']);
    gulp.watch(config.all.jade, ['compile-template']);
    gulp.watch(config.all.js, ['java-script']);
    gulp.watch(config.all.html, ['compile-jade']);

});

gulp.task('default', ['watcher']);