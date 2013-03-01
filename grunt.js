module.exports = function (grunt) {
    grunt.initConfig({
        lint: {
            files: ['src/**/*.js']
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
            all: ['test/runner.html']
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
        min: {
            dist: {
                src: ['build/ash.js'],
                dest: 'build/ash.min.js'
            }
        },
        requirejs: {
            compile: {
                options: {
                    mainConfigFile: "build.js"
                }
            },
            minified: {
                options: {
                    mainConfigFile: "build.min.js"
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
