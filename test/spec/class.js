/**
 * Testing Class inheritance
 */
define ([
    'brejep/class'
], function(Class) {
    'use strict';

    // base class
    var Person = Class.extend({
        init: function (name) {
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
        init: function (){
            this._super('A ninja');
        },
        
        dance: function (){
            return this._super();
        },
        
        swingSword: function (){
            return 'swings a katana';
        },
        
        say: function () {
            return this._super('...');
        }
    });

    module('Test Class inheritance');

    test('create a class & an instance', function () {
        var Test = Class.extend({
            value: 1,
            name: 'test'
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
            init: function () {
                ok('init is called');
            }
        });
        
        var SubTest = Test.extend({
            init: function () {
                this._super();
                ok('sub-init is called');
            }
        });

        var test = new Test();
        var subTest = new SubTest();
    });
    
    test('check instance & multiple inheritances with instanceOf', function () {
        var p = new Person();
        var n = new Ninja();
        
        ok(p instanceof Person);
        ok(p instanceof Class);
        ok(n instanceof Ninja);
        ok(n instanceof Person);
        ok(n instanceof Class);
    });

});
