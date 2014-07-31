module.exports = function(grunt) {

    // Config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        coffee: {
            compileJoined: {
                options: {
                  join: true
                },
                files: {
                  'core/assets/js/coffee.js': ['core/assets/js/*.coffee'] // concat then compile into single file
                }
            },
            compileAdmin: {
                options: {
                  join: true
                },
                files: {
                  'js/admin.js': ['core/assets/js/admin/*.coffee'] // concat then compile into single file
                }
            },
        },

        concat: {   
            dist: {
                src: [
                    'core/assets/js/vendor/modernizr-2.6.2.min.js',
                    'core/assets/js/vendor/jquery-1.10.2.min.js',
                    'core/assets/js/vendor/bootstrap.min.js',
                    'core/assets/js/vendor/jquery.backstretch.js',
                    'core/assets/js/vendor/background.js',
                    'core/assets/js/vendor/imagesloaded.pkgd.min.js',
                    'core/assets/js/vendor/masonry.pkgd.min.js',
                    'core/assets/js/*.js'
                ],
                dest: 'js/production.js',
            }
        },

        uglify: {
            build: {
                src: 'js/production.js',
                dest: 'js/production.min.js'
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'core/assets/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'img/'
                }]
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'css/production.css': 'core/assets/css/main.scss'
                }
            } 
        },

        watch: {
            options: {
                livereload: true,
            },
            scripts: {
                files: ['core/assets/js/*.js', 'core/assets/js/*.coffee', 'core/assets/js/admin/*.coffee'],
                tasks: ['coffee', 'concat', 'uglify'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['core/assets/css/*.scss', 'core/assets/css/vendor/bootstrap/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false,
                }
            },
        }

    });

    // Tasks loaded
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    // "Grunt" actions
    grunt.registerTask('default', ['coffee', 'concat', 'uglify', 'imagemin', 'sass']);

};