# ash-js

A javascript port of Ash (an Actionscript 3 entity framework for game development - https://github.com/richardlord/Ash)
The Ash framework has a website with other ports, examples and further information - http://www.ashframework.org

## Build
* `ash.js` contains Ash Framework including the Signals
* `ash.min.js` is the minified version from `ash.js`
* You can include ash.js using AMD (e.g requirejs) or add it as a script tag on your HTML

## Example on how to use ash-js
TBD

## How to build the library
You can build your own ash-js.

### Dependency
* node.js/npm
* grunt

### Command line
* `grunt requirejs:minifed` to build ash.min.js (minified version)
* `grunt requirejs:compile` to build ash.js (non-minifed version)
* The results are available on folder `build`

## License
MIT License
