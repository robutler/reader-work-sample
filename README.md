# READER WORK SAMPLE

## Setup

Requirements: Node.js 0.10.x or higher. Bower (npm install -g bower). Grunt (npm install -g grunt-cli).

Run `npm install && bower install` from the command line to install dependencies.

## Build & development

Run `grunt` for building and `grunt serve` for preview. Distribution build can be previewed by running `grunt serve:dist`.

Note that the distribution build still requires the proxy connection to DN.se to allow the http requests to get through.

## Libraries used in application

AngularJS
https://angularjs.org/
MIT License

Normalize.css
https://necolas.github.io/normalize.css/
MIT License

x2js
https://code.google.com/p/x2js/
Apache License 2.0

## Notes

Tested on the latest versions of Chrome, Firefox, and Safari.
Project will not run properly on browsers that doesn't support Flexbox.

If the proxied connection to DN.se fails, the app will try to load a local backup of the feed instead. This is to make sure there's always data visible in the UI for demo purposes.