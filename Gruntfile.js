/*global module */
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    mochaTest: {
      test: {
        options: {
          reporter: 'xunit-file'
        },
      //doesn't actually seem to be respected by mochaTest or xunit-file
      //dest: 'xunit.xml',	
        src: ['tests/**/*.js']
       }
    },
    jshint: {
      files: ['Gruntfile.js', '*.js', 'public/**/*.js', 'tests/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          console: true,
          module: true,
          document: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint', 'mochaTest']);
};
