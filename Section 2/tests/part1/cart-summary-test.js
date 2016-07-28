var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;
var CartSummary = require('./../../src/part1/cart-summary');
var tax = require('./../../src/part1/tax');

describe('CartSummary', function() {
	before(function() {
		sinon.stub(tax, 'calculateTax', function(subtotal, percent, expectCallback) {
			
            var totalTax = subtotal * (percent / 100);
            expectCallback(totalTax);
		});
	});

	after(function() {
		
	});

	it('getSubtotal() should return 0 if no items are passed in', function() {
		var cartSummary = new CartSummary([]);
		expect(cartSummary.getSubtotal()).to.equal(0);
	});

	it('getSubtotal() should return the sum of the price * quantity for all items', function() {
		var cartSummary = new CartSummary([
			{
				id: 1,
				quantity: 4,
				price: 50
			},
			{
				id: 2,
				quantity: 2,
				price: 30
			},
			{
				id: 3,
				quantity: 1,
				price: 40
			}
		]);
		expect(cartSummary.getSubtotal()).to.equal(300);
	});

	it('calculateTax() should return 30 if tax percent is 10%', function(done) {
		var cartSummary = new CartSummary([
			{
				id: 1,
				quantity: 10,
				price: 10
			},
			{
				id: 2,
				quantity: 10,
				price: 10
			},
			{
				id: 3,
				quantity: 10,
				price: 10
			}
		]);

        var expectCallback = function(totalTax){
            expect(totalTax).to.equal(30);
            expect(tax.calculateTax.getCall(0).args[0]).to.equal(300);
            expect(tax.calculateTax.getCall(0).args[1]).to.equal(10);
            done();
        };
        
		cartSummary.getTax(10, expectCallback);
	});
});
