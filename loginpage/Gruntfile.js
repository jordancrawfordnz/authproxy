'use strict';

module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');

	var config;
	function getConfig() {
		if (!config) {
			var configPath = grunt.option('config-path');
			config = require(configPath);
			config.resourcesPrefix = grunt.option('resources-prefix') || '';
			config.apiPrefix = grunt.option('api-prefix') || '';

			// Set the defaults if not set.
			if (config.title === undefined) {
				config.title = 'Login';
			}
			if (config.accent === undefined) {
				config.accent = '#20A2E8';
			}
		}
		return config;
	}

	// Defines the keys that should go to the sass environment file.
	var sassKeys = [
		'accent'
	];
	var sassEnvPath = 'env.sass';
	var fullSassPath = 'sass/fullsass.sass';

	grunt.registerTask('setSassEnv', function() {
		var config = getConfig();
		var toWrite = '';
		Object.keys(config).forEach(function(configKey) {
			if (sassKeys.indexOf(configKey) !== -1) {
				var configValue = config[configKey];
				toWrite += '$' + configKey + ' : ' + configValue + '\n';
			}
		});
		grunt.file.write(sassEnvPath, toWrite);
	});

	grunt.registerTask('removeSassEnv', function() {
		grunt.file.delete(sassEnvPath);
		grunt.file.delete(fullSassPath);
	});

	/*
		Contains rules that:
			- build the HTML from the Jade template
			- build the CSS from the SASS files
			- minify the JavaScript
			- use CDN references for libraries
	*/
	grunt.initConfig({
		connect: {
			server: {
				options: {
					port: 9000,
					base: 'dist'
				}
			}
		},
		sass: {
		    dist: {
		    	files: {
		        	'dist/styles.min.css': 'sass/fullsass.sass'
		      	},
		      	options: {
		      		loadPath: sassEnvPath,
		      		style: 'compressed',
		      		sourcemap: 'none'
		      	}
		    }
		},
		uglify: {
			dist: {
				files: {
					'dist/scripts.min.js' : 'js/*.js'
				}
			}
		},
		jade: {
			dist: {
				files: {
					'dist/index.html' : 'index.jade'
				},
				options: {
					data: function() {
						return getConfig();
					}
				}
			}
		},
		concat: {
			sassConfig: {
				src: ['env.sass', 'sass/style.sass'],
				dest: fullSassPath
			}
		},
		watch: {
			files: ['Gruntfile.js', 'sass/*.sass', 'index.jade', 'js/*.js'],
			tasks: ['build']
		}
	});

	grunt.registerTask('buildSassWithConfig', [
		'setSassEnv',
		'concat:sassConfig',
		'sass',
		'removeSassEnv'
	]);

	grunt.registerTask('build', [
		'buildSassWithConfig',
  	'jade',
  	'uglify'
	]);

	grunt.registerTask('default', [
		'build',
		'connect',
		'watch'
	]);
};
