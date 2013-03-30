/**
 * Testing Class inheritance
 */
define ([
    'brejep/class'
], function(Class) {
    'use strict';

    // base class
    var Person = Class.extend({
        constructor: function (name) {
            this.name = name || 'A person';
        },
        
        dance: function () {
            return 'can\'t dance';
        },
        
        say: function (something) {
            return something || this.name;
        }
    });

    var Ninja = Person.extend({
        constructor: function (){
            Person.super.constructor.call(this, 'A ninja');
        },
        
        dance: function (){
            return Ninja.super.dance.call(this);
        },
        
        swingSword: function (){
            return 'swings a katana';
        },
        
        say: function () {
            return Ninja.super.say.call(this, '...');
        }
    });

    module('Test Class inheritance');

    test('create a class & an instance', function () {
        var Test = Class.extend({
            name: 'test',
            value: 1,
            constructor: function () { }
        });
        
        var test = new Test();
        equal(test.value, 1);
        equal(test.name, 'test');
    });
    
    test('create instances', function () {
        var ordinaryGuy = new Person();
        ok(ordinaryGuy, 'an instance created');
        equal(ordinaryGuy.say(), 'A person');
        equal(ordinaryGuy.say('hello'), 'hello');
        
        var name = 'Mr. Budi';
        var businessMan = new Person(name);
        ok(businessMan, 'an instance created');
        equal(businessMan.say(), name);
        
        ok(businessMan !== ordinaryGuy);
    });
    
    test('constructors are called', 3, function () {
        var Test = Class.extend({
            constructor: function () {
                ok(true, 'constructor is called');
            }
        });
        
        var SubTest = Test.extend({
            constructor: function () {
                SubTest.super.constructor.call(this);
                ok(true, 'sub-constructor is called');
            }
        });

        var test = new Test();
        var subTest = new SubTest();
    });
    
    test('check instance & multiple inheritances with instanceOf', function () {
        notEqual(Person, Ninja);
        
        var p = new Person();
        var n = new Ninja();
        
        ok(p instanceof Person);
        // Note: can't do instanceof with Class since it's an object not a function
        //ok(p instanceof Class);
        ok(n instanceof Ninja);
        ok(n instanceof Person);
        // Note: can't do instanceof with Class since it's an object not a function
        //ok(n instanceof Class);
    });

    test('gets instance class & constructor', function () {
        var hatori = new Ninja();
        strictEqual(hatori.constructor.prototype, Ninja.prototype);
    });
    
    test('gets instance constructor', function () {
        var hatori = new Ninja();
        var fuma = new hatori.constructor();
        equal(hatori.say(), fuma.say());
        ok(hatori !== fuma);
    });
    
});
