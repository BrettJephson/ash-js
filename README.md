# ash-js
A JavaScript port of [Ash Framework](https://github.com/richardlord/Ash), an Actionscript 3 entity framework for game development

## Ash Framework
![Ash Framework](http://www.ashframework.org/images/logo.png "Ash Framework")

Ash Framework is a high-performance entity system framework for game development, developed by Richard Lord in ActionScript 3.
For more in-depth introduction and examples, please check out its official page at http://www.ashframework.org.

## Features
- All core classes from the original Ash Framework are ported
- Signal system from [JS-Signal](https://github.com/millermedeiros/js-signals)
- A utility class for simple Class Inheritance

## Usage
On folder `build`, you will get the library file. You can use `ash.js` or the minified version `ash.min.js`.
You can use the Ash framework as inline script (by using script tag on your HTML file) or with AMD (e.g requirejs).

## Building your own
This library uses [Grunt](http://www.gruntjs.com) for building.

### Dependencies
* Node.js & `npm`
* Grunt's CLI installed using `npm install -g grunt-cli`
* Do `npm install` and it will automatically download & install the required modules for building the library
* Additionally, you might want to have [PhantomJS](phantomjs) installed on your system to enjoy the automatic unit testings.
However, you don't have to install PhantomJS and can still do unit testing directly from your browser (see instruction below).

### Command lines
* `grunt` will run jshint, build your library files (minified & non-minified version), and do unit testings using PhantomJS
* `grunt requirejs:compile` if you just want to build `ash.js` (non-minifed version)
* `grunt requirejs:minifed` if you just want to build `ash.min.js` (minified version)

### Unit Testings without PhantomJS
* Do `grunt connect` to start a local webserver.
* Open the address `http://localhost:9001/test/` on your browser and execute every html files there.

## Example on how to use ash-js
* Ashteroids, a simple asteroids: https://github.com/abiyasa/ashjs-asteroids-example (*still WIP*)

## License
MIT License
