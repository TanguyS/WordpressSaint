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
                  'assets/js/coffee.js': ['assets/js/*.coffee'] // concat then compile into single file
                }
            },
            compileAdmin: {
                options: {
                  join: true
                },
                files: {
                  'js/admin.js': ['assets/js/admin/*.coffee'] // concat then compile into single file
                }
            },
        },

        concat: {   
            dist: {
                src: [
                    'assets/js/vendor/*.js',
                    'assets/js/*.js'
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
                    cwd: 'assets/images/',
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
                    'css/production.css': 'assets/css/main.scss'
                }
            } 
        },

        watch: {
            options: {
                livereload: true,
            },
            scripts: {
                files: ['assets/js/*.js', 'assets/js/*.coffee', 'assets/js/admin/*.coffee'],
                tasks: ['coffee', 'concat', 'uglify'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['assets/css/*.scss', 'assets/css/vendor/bootstrap/*.scss'],
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