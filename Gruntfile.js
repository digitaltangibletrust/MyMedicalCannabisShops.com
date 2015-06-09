'use strict';
var config = require('config');

module.exports = function (grunt) {
  grunt.initConfig({
    'pkg': grunt.file.readJSON('package.json'),
    'shell': {},
    'githooks': {
      'all': {
        'pre-commit': 'jsbeautifier:git-pre-commit',
      }
    },
    'copy': {
      'vendor': {
        'files': [{
          'expand': true,
          'cwd': 'bower_components/bootstrap/',
          'src': ['js/**', 'less/**'],
          'dest': 'public/vendor/bootstrap/'
        }, {
          'expand': true,
          'cwd': 'bower_components/lodash/dist/',
          'src': ['lodash.min.js'],
          'dest': 'public/vendor/lodash/'
        }, {
          'expand': true,
          'cwd': 'bower_components/jquery/dist/',
          'src': ['jquery.min.js', 'jquery.min.map'],
          'dest': 'public/vendor/jquery/'
        }, {
          'expand': true,
          'cwd': 'bower_components/momentjs/',
          'src': ['moment.js'],
          'dest': 'public/vendor/momentjs/'
        }, {
          'expand': true,
          'cwd': 'bower_components/respond/src/',
          'src': ['respond.js'],
          'dest': 'public/vendor/respond/'
        }]
      }
    },
    'migrate': {
      'options': {
        'env': {
          'DATABASE_URL': config.db.uri
        },
        'verbose': true
      }
    },
    'concurrent': {
      'dev': {
        'tasks': ['nodemon', 'watch:clientJS', 'watch:serverJS', 'watch:clientLess'],
        'options': {
          'logConcurrentOutput': true
        }
      }
    },
    'nodemon': {
      'dev': {
        'script': 'app.js',
        'options': {
          'ignore': [
            'node_modules/**',
            'public/**'
          ],
          'ext': 'js'
        }
      }
    },
    'watch': {
      'clientJS': {
        'files': [
          'public/js/*.js', '!public/js/*.min.js',
          'public/js/**/*.js', '!public/js/**/*.min.js'
        ],
        'tasks': ['newer:uglify']
      },
      'serverJS': {
        'files': ['views/**/*.js'],
        'tasks': ['newer:jshint:server']
      },
      'clientLess': {
        'files': [
          'public/less/**/*.less'
        ],
        'tasks': ['less']
      }
    },
    'uglify': {
      'options': {
        'sourceMap': true,
        'sourceMapName': function (filePath) {
          return filePath + '.map';
        }
      },
      'thirdPartyAndBrowserify': {
        'files': {
          'public/js/thirdPartyAndBrowserify.min.js': [
            // bootstrap
            'public/vendor/bootstrap/js/affix.js',
            'public/vendor/bootstrap/js/alert.js',
            'public/vendor/bootstrap/js/button.js',
            'public/vendor/bootstrap/js/carousel.js',
            'public/vendor/bootstrap/js/collapse.js',
            'public/vendor/bootstrap/js/dropdown.js',
            'public/vendor/bootstrap/js/modal.js',
            'public/vendor/bootstrap/js/tooltip.js',
            'public/vendor/bootstrap/js/popover.js',
            'public/vendor/bootstrap/js/scrollspy.js',
            'public/vendor/bootstrap/js/tab.js',
            'public/vendor/bootstrap/js/transition.js',
            // libs
            'public/vendor/lodash/lodash.min.js',
            'public/vendor/momentjs/moment.js'
          ]
        }
      },
      'app': {
        'files': {
          'public/js/app.min.js': [
            'public/js/main.js'
          ]
        }
      }
    },
    'jsbeautifier': {
      'default': {
        'src': [
          'models/**/*.js',
          'views/**/*.js',
          './*.js'
        ],
        'options': {
          'config': './.jsbeautifyrc'
        }
      },
      'git-pre-commit': {
        'src': [
          'models/**/*.js',
          'views/**/*.js',
          './*.js'
        ],
        'options': {
          'config': './.jsbeautifyrc',
          'mode': 'VERIFY_ONLY'
        }
      }
    },
    'jshint': {
      'server': {
        'options': {
          'jshintrc': '.jshintrc-server'
        },
        'src': [
          'models/**/*.js',
          'views/**/*.js'
        ]
      }
    },
    'less': {
      'options': {
        'compress': true
      },
      'core': {
        'files': {
          'public/less/core.min.css': [
            'public/less/core.less']
        }
      },
    },
    'clean': {
      'vendor': {
        'src': ['public/vendor/**']
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-db-migrate');
  grunt.loadNpmTasks('grunt-jsbeautifier');
  grunt.loadNpmTasks('grunt-githooks');

  grunt.registerTask('default', ['copy:vendor', 'newer:uglify', 'newer:less', 'concurrent']);
  grunt.registerTask('build', ['copy:vendor', 'uglify', 'less']);
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('format', ['jsbeautifier:default']);
};
