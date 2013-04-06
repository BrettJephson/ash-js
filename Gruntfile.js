module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: [
                'Gruntfile.js', 'build.js', 'build.min.js',
                'src/**/*.js',
                'test/spec/*.js'
            ],
            options: {
                browser: true,
                white: false
            }
        },
        qunit: {
            // test using AMD
            files: ['test/runner.html'],

            // test the build & minified version at build
            builds: [ 'test/test_build.html', 'test/test_build_min.html',
                'test/test_build_require.html', 'test/test_build_min_require.html'
            ]
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
                    mainConfigFile: "build.js"
                }
            },
            minified: {
                options: {
                    mainConfigFile: "build.min.js"
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: '.',
                    keepalive: true
            }
        }
  }
    });

    grunt.registerTask('test', ['jshint', 'qunit:files']);
    grunt.registerTask('default', ['jshint', 'qunit:files', 'requirejs', 'qunit:builds']);

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-connect');
};
