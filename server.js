const budo = require('budo');

budo('src/main.js', {
  serve: 'build/bundle.js',
  live: true,
  open: true,
  dir: 'public',
  stream: process.stdout,
  watchGlob: '**/*.{html,css}',
  browserify: {
    paths: [
      __dirname + '/src'
    ]
  }
});