'use strict';

module.exports = function(grunt) {
	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);
	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);
	var modRewrite = require('connect-modrewrite');
	var serveStatic = require('serve-static');

	// Define the configuration for all the tasks
	grunt.initConfig({

		bower: {
			install: {
				targetDir: 'libs',
				verbose: true,
				cleanup: true
			}
		},

		clean: ['dist', 'libs', 'lib'],

		// Watches files for changes and runs tasks based on the changed files
		watch: {
			styles: {
				files: ['styles/scss/*.scss', 'styles/scss/**/*.scss'],
				tasks: ['sass'],
				options: {
					livereload: {
						port: 9000
					}
				},
			},
			sources: {
				files: [
					'js/src/**/*.js',
					'*.html',
					'views/**/*.html'
				],
				tasks: ['concat:libs', 'concat:sources'],
				options: {
					livereload: {
						port: 9000
					}
				},
			}
		},

		// The actual grunt server settings
		connect: {
			server: {
				options: {
					port: 1337,
					hostname: '',
					livereload: 9000,
					open: true,
					middleware: function(connect, options, middlewares) {
						middlewares.push(modRewrite(['^[^\\.]*$ /index.html [L]']));
						options.base.forEach(function(base) {
							middlewares.push(serveStatic(base));
						});
						return middlewares;
					}
				}
			}
		},
		sass: {
			dist: {
				files: {
					'dist/styles/styles.css': 'styles/scss/index.scss'
				}
			}
		},

		concat: {
			options: {
				separator: ';',
			},
			libs: {
				src: [
					'libs/angular/angular.js',
					'libs/angular-route/angular-route.js'
				],
				dest: 'dist/script/libs.min.js'
			},
			sources: {
				src: [
					'js/src/app.js',
					'js/src/directives/*.js',
					'js/src/directives/*/*.js',
					'js/src/controllers/*.js',
					'js/src/controllers/*/*.js',
					'js/src/services/*.js',
					'js/src/services/*/*.js',
					'js/src/filters/*.js',
					'js/src/filters/*/*.js'
				],
				dest: 'dist/script/app.min.js'
			}
		},

		mkdir: {
			options: {
				create: [
					'dist'
				]
			}
		},

	});

	grunt.registerTask('build', function() {
		grunt.task.run([
			'clean',
			'mkdir',
			'bower:install',
			'sass',
			'concat:libs',
			'concat:sources'
		]);
	});

	grunt.registerTask('serve', function() {
		grunt.task.run([
			'clean',
			'mkdir',
			'bower:install',
			'sass',
			'concat:libs',
			'concat:sources',
			'connect:server',
			'watch'
		]);
	});
};
