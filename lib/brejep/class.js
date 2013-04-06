/**
 * A lightweight inheritance API which is very similar to the 
 * John Resig's Simple Inheritance API.
 *
 * Original author: Axel Rauschmayer
 * Original code: https://github.com/rauschma/class-js
 
* Code examples

// Superclass
var Person = Class.extend({
    constructor: function (name) {
        this.name = name;
    },
    describe: function() {
        return "Person called "+this.name;
    }
});

// Subclass
var Worker = Person.extend({
    constructor: function (name, title) {
        Worker.super.constructor.call(this, name);
        this.title = title;
    },
    describe: function () {
        return Worker.super.describe.call(this)+" ("+this.title+")"; // (*)
    }
});
var jane = new Worker("Jane", "CTO"); 
 */
define([], function () {

    var Class = {
        
        extend: function (properties) {
            var superProto = this.prototype || Class;
            var proto = Object.create(superProto);
            // This method will be attached to many constructor functions
            // => must refer to "Class" via its global name (and not via "this")
            Class.copyOwnTo(properties, proto);
            
            var constr = proto.constructor;
            if (!(constr instanceof Function)) {
                throw new Error("You must define a method 'constructor'");
            }
            // Set up the constructor
            constr.prototype = proto;
            constr.super = superProto;
            constr.extend = this.extend; // inherit class method
            return constr;
        },
    
        copyOwnTo: function(source, target) {
            Object.getOwnPropertyNames(source).forEach(function(propName) {
                Object.defineProperty(target, propName,
                    Object.getOwnPropertyDescriptor(source, propName));
            });
            return target;
        }
    };

    return Class;
});
