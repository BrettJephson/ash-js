var engine,
    system1,
    system2;

module("Test Systems", {
    setup : function() {
        engine = Object.create( Engine ).initiialise();
    },
    teardown : function() {
        engine = null;
    }
});

test("systemsGetterReturnsAllTheSystems", function() {

});