# ash-js
A JavaScript port of [Ash Framework](https://github.com/richardlord/Ash), an Actionscript 3 entity framework for game development

## Ash Framework
![Ash Framework](http://www.ashframework.org/images/logo.png "Ash Framework")

Ash Framework is a high-performance entity system framework for game development, developed by Richard Lord in ActionScript 3.

For more in-depth introduction and examples, please check out its official page at http://www.ashframework.org.

## Features
- All core classes from the original Ash Framework are ported
- Signal system from [JS-Signal](https://github.com/millermedeiros/js-signals)
- A utility class for [simple Class Inheritance](https://github.com/rauschma/class-js)

## Usage
On folder `build`, you can found the built & ready-to-use library file.

There are two versions you can choose from:

* `ash.js`, the un-minified version, good for development & debugging
* `ash.min.js`, the minified version, good for release

You can use the library file as inline script (by using script tag on your HTML file) or
using AMD (e.g [RequireJS](http://requirejs.org/)).

## Building your own
This library uses [Grunt](http://www.gruntjs.com) for building.

### Dependencies
* Node.js
* Grunt's CLI installed using `npm install -g grunt-cli`
* Go to `ash-js` folder & do `npm install`. This will automatically download & install the required modules for building the library
* Additionally, you might want to have [PhantomJS](phantomjs) installed on your system to enjoy automatic unit testings.
However, you don't have to install PhantomJS and can still do unit testing directly from your browser
(see instruction [below](#unit-testings-without-phantomjs)).

### Command lines
* `grunt` will run jshint, build your library files (both minified & non-minified version), and do automatic unit testings using PhantomJS
* `grunt requirejs:compile` if you just want to build `ash.js` (non-minifed version) and skip the unit testing
* `grunt requirejs:minifed` if you just want to build `ash.min.js` (minified version) and skip the unit testing

### Unit Testings without PhantomJS
You can still do unit testing without having PhantomJS installed on your system.

* Do `grunt connect` to start a local webserver.
* From your browser, go to `http://localhost:9001/test/` and manually click each html files there.

List of unit test files:

* *runner.html* : test each Ash Framework module separately
* *test_build.html* : test the build version `build/ash.js` as inline script ( *WIP* )
* *test_build_min.html* : test the minified & build version `build/ash.min.js` as inline script ( *WIP* )
* *test_build_require.html* : test the build version `build/ash.js` with requirejs ( *WIP* )
* *test_build_min_require.html* : test the minified & build version `build/ash.js` with requirejs ( *WIP* )

## Example on how to use ash-js
* Ashteroids, a simple asteroids: https://github.com/brejep/ashjs-asteroids-example

## License
MIT License
