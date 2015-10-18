(function() {
    'use strict';
    module.exports = function(grunt) {
        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            concat: {
                dev: {
                    src: [
                        'bower/angular/angular.js',
                        'bower/lodash/lodash.js',
                        'components/**/*.js'
                    ],
                    dest: 'dist/<%= pkg.name %>-combined.js',
                    options: {
                        separator: ';',
                        stripBanners: true
                    }
                }
            },
            connect: {
                serve: {
                    options: {
                        port: 4444,
                        hostname: '*',
                        livereload: 17177
                    }
                }
            },
            html2js: {
                main: {
                    options: {
                        base: './'
                    },
                    src: [
                        'components/**/*.html'
                    ],
                    dest: 'dist/templates.js'
                }
            },
            uglify: {
                //  TODO uglify all component files but leave libraries unharmed
            },
            jshint: {
                all: ['Gruntfile.js', 'components/**/*.js', 'components/*.js']
            },
            clean: ['dist/'],
            less: {
                production: {
                    options: {
                        compress: true,
                        cleancss: true
                    },
                    files: {
                        'dist/app.min.css': 'components/core/<%= pkg.name %>.less'
                    }
                }
            },
            watch: {
                options: {
                    livereload: '<%= connect.serve.options.livereload %>',
                    livereloadOnError: false
                },
                html: {
                    files: [
                        'components/{,*/}*.html'
                    ],
                    tasks: [
                        'html2js'
                    ]
                },
                script: {
                    files: ['components/{,*/}*.js'],
                    tasks: ['jshint', 'concat']
                },
                less: {
                    files: 'components/{,*/}*.less',
                    tasks: ['less']
                }
            },
            copy: {
                fonts: {
                    expand: true,
                    cwd: 'bower/bootstrap/dist/fonts/',
                    src: '**',
                    dest: 'fonts/'
                }
            }
        });

        require('load-grunt-tasks')(grunt);

        grunt.registerTask('dist', ['clean', 'jshint', 'concat', 'uglify', 'less', 'copy']);
        grunt.registerTask('deploy', ['clean', 'html2js', 'concat', 'less', 'copy']);
        grunt.registerTask('serve', ['deploy', 'connect', 'watch']);
    };
})();