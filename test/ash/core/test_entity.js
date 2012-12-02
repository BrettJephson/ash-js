var entity;

module("Test Entities", {
	setup : function() {
		entity = Object.create( Entity );
	},
	teardown : function() {
		entity = null;
	}
});

test("addReturnsReferenceToEntity", function() {
	var component = new MockComponent();
	var e = entity.add( component );
	ok( e, sameInstance( entity ) );
});


function MockComponent() {
	this.value = 0;
}