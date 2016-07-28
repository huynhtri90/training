var tax = require('./tax');

function CartSummary(items) {
	this._items = items;
}

function CalculateSubTotal(subtotal, item){
      return subtotal += item.quantity * item.price;
};

CartSummary.prototype.getSubtotal = function() {
	if (this._items.length) {
		return this._items.reduce(CalculateSubTotal, 0);
	}

	return 0;
};

CartSummary.prototype.getTax = function(percent, expectCallback) {
	tax.calculateTax(this.getSubtotal(), percent, expectCallback);
};

module.exports = CartSummary;
