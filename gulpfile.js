/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
const autoprefixer = require('autoprefixer')
const fs = require('fs')
const gulp = require('gulp')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const postcss = require('gulp-postcss')
const { forEach } = require('lodash')
const modules = require('postcss-modules')
const rimraf = require('rimraf')

function batch (length, cb) {
  var count = length // eslint-disable-line no-var
  return () => (--count === 0 ? cb() : null)
}

function generateJs (cssFileName, json) {
  const cssName = cssFileName.replace(__dirname, '.').replace('./src', '.')
  fs.writeFileSync(`${cssName}.js`, `module.exports = ${JSON.stringify(json)}`)
}

gulp.task('js', ['clean'], () =>
  gulp
    .src(['src/**/*.js', '!src/**/test/**', '!src/**/*.spec.js'])
    .pipe(babel())
    .pipe(gulp.dest('.'))
)

gulp.task('css', ['clean', 'js'], () =>
  gulp
    .src('src/**/*.css')
    .pipe(
      postcss([
        autoprefixer,
        modules({
          generateScopedName: 'cwf_[local]_[hash:base64:2]',
          getJSON: generateJs
        })
      ])
    )
    .pipe(concat('style.css'))
    .pipe(gulp.dest('.'))
)

gulp.task('clean', finish => {
  const filesToRemove = fs.readdirSync(`${__dirname}/src`)
  const cb = batch(filesToRemove.length + 1, finish)
  rimraf('./style.css', cb)
  forEach(
    filesToRemove,
    entity => (entity === '.DS_Store' ? cb() : rimraf(`./${entity}`, cb))
  )
})

gulp.task('build', ['clean', 'js', 'css'])

gulp.task('default', ['build'])
