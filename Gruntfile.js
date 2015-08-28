var pngquant = require('imagemin-pngquant');
var mozjpeg  = require('imagemin-mozjpeg');
var gifsicle = require('imagemin-gifsicle');

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
                  'js/vendor/coffee.js': ['coffee/*.coffee', 'coffee/**/*.coffee'] // concat then compile into single file
                }
            }
        },

        concat: {   
            dist: {
                src: [
                    ['js/vendor/*.js', 'js/vendor/**/*.js']
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

        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'css/production.css': 'sass/main.scss'
                }
            } 
        },
        
        imagemin:{
            target: {
                options: {
                    optimizationLevel: 3,
                    progressive: true,
                    use: [pngquant({quality: '5-75', speed: 1}), mozjpeg(), gifsicle()]
                },
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['**/*.{png,jpg,jpeg,gif}'],
                    dest: 'images/'
                }]
            }
        },

        watch: {
            options: {
                livereload: true,
            },
            scripts: {
                files: ['coffee/*.coffee', 'coffee/**/*.coffee'],
                tasks: ['coffee', 'concat', 'uglify'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['sass/*.scss'],
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
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    // "Grunt" actions
    grunt.registerTask('default', ['coffee', 'concat', 'uglify', 'sass', 'imagemin']);

};