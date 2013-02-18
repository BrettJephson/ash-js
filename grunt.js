module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        lint: {
            files: ['src/**/*.js'],
            core: [ 'src/ash/core/system.js' ]
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                indent: 4,
                camelcase: true,
                latedef: true,
                newcap: true,
                noarg: true,
                noempty: true,
                nonew: true,
                quotmark: true,
                undef: true,
                unused: true,
                strict: false,
                trailing: true,
                maxparams: 3,
                maxdepth: 2,
                maxstatements: 5,
                maxcomplexity: 5,
                maxlen: 180,
                devel: true,
                browser: true
            }
        },
        qunit: {
            all: ['test/test_runner.html']
        },
        server: {
            port: 8000,
            base: '.'
        },
        watch: {
            tests: {
                files: '<config:lint.files>',
                tasks: 'all_checks'
            }
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
        min: {
            dist: {
                src: ['build/ash.js'],
                dest: 'build/ash.min.js'
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
    
    grunt.registerTask('all_checks', 'lint all_tests');
    grunt.registerTask('all_tests', 'server qunit');
    grunt.registerTask('compile', 'concat min');
    grunt.registerTask('require', 'requirejs');
    grunt.registerTask('default', 'all_checks');
    
    grunt.loadNpmTasks('grunt-requirejs');
};