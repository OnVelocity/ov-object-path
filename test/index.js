'use strict';
/*global describe, it, beforeEach*/

var expect = require('chai').expect;
var path = require('../lib');

describe('ov-object-path', function () {
	var obj;
	beforeEach(function() {
		obj = {foo: 'bar', a: {b: {c: 'd'}}, array: [0, 1, 2]};
	});
	describe('get(object, path)', function () {
		it('resolves first level property value', function () {
			expect(path.get(obj, 'foo')).to.equal('bar');
		});
		it('resolves nested property value', function () {
			expect(path.get(obj, 'a.b.c')).to.equal('d');
		});
		it('resolves an Object value', function () {
			expect(path.get(obj, 'a.b')).to.eql({c: 'd'});
		});
		it('resolves an Array indexed value', function () {
			expect(path.get(obj, 'array[2]')).to.equal(2);
		});
		it('resolves a path that does not exist to undefined value', function () {
			expect(path.get(obj, 'a.b[2]')).to.be.undefined;
			expect(path.get(obj, 'array[1][2].b')).to.be.undefined;
		});
	});
	describe('set(object, path, value)', function () {
		it('updates a property name with given value', function () {
			path.set(obj, 'foo', 'new-bar');
			expect(obj.foo).to.equal('new-bar');
		});
		it('updates a nested property name with given value', function () {
			path.set(obj, 'test.it', 'yes');
			expect(obj.test.it).to.equal('yes');
		});
		it('updates an Array index with given value', function () {
			path.set(obj, 'array[1]', 'yes');
			expect(obj.array[1]).to.equal('yes');
		});
		it('populates an intermediate Array index with an object to set given value', function () {
			path.set(obj, 'newArray[0].a', 'wow');
			expect(obj.newArray[0].a).to.equal('wow');
		});
		it('removes given value', function () {
			path.set(obj, 'a.b');
			expect(obj.a).to.eql({});
			expect(obj.a.b).to.be.undefined;
		});
		it('removes given Array index value', function () {
			path.set(obj, 'array[0]');
			expect(obj.array[0]).to.equal(1);
		});
	});
});
