gulp = require 'gulp'
concat = require 'gulp-concat'

gulp.task 'default', ()->
  gulp.src ['./*.js']
  .pipe concat 'callButton.js'
  .pipe gulp.dest './dist'
