module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: [ 'Gruntfile.js', 'src/**/*.js' ],
            options: {
                browser: true,
                white: false
            }
        },
        qunit: {
            files: ['test/test_runner.html']
        },
        concat: {
            dist: {
                src: [
                    'lib/vendor/signals.js',
                    'lib/brejep/fillsnfixes.js',
                    'lib/brejep/dictionary.js',
                    'lib/brejep/point.js',
                    'src/ash/core/entity.js',
                    'src/ash/core/entitylist.js',
                    'src/ash/core/node.js',
                    'src/ash/core/nodelist.js',
                    'src/ash/core/nodepool.js',
                    'src/ash/core/family.js',
                    'src/ash/core/componentmatchingfamily.js',
                    'src/ash/core/system.js',
                    'src/ash/core/systemlist.js',
                    'src/ash/core/engine.js'
                ],
                dest: 'build/ash.js'
            }
        },
        uglify: {
            dist: {
                files: [
                    { dest: 'build/ash.min.js', src: 'build/ash.js' }
                ]
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: '',
                    name: 'build/ash-build',
                    optimize: 'uglify',
                    findNestedDependencies: true,
                    paths: {
                        'ash': 'src/ash/core',
                        'brejep': 'lib/brejep',
                        'libs/signals': 'lib/vendor/signals',
                        'almond': 'lib/vendor/almond'
                    },
                    out: 'build/ash.require.js'
                }
            }
        }
    });
    
    grunt.registerTask('test', ['jshint', 'qunit']);
    grunt.registerTask('norequire', ['jshint', 'qunit', 'concat', 'uglify']);
    grunt.registerTask('default', ['jshint', 'qunit', 'requirejs']);

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
};