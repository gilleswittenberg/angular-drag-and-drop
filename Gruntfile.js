module.exports = function (grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        globals: {
          'angular': true
        },
        // ignore warning where 'use strict' is outside of function
        //'-W097': true
      },
      all: ['*.js']
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('test', ['karma:unit']);
};
