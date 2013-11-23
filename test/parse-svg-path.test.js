
var chai = require('./chai')
var parse = require('..')

describe('parse', function(){
	it('moveTo', function(){
		(function(){ parse('m 10') }).should.throw()
		parse('m 10 20').should.eql([['m', 10, 20]])
	})

	it('exponents', function(){
		parse('m 1e3 2e-3').should.eql([['m', 1e3, 2e-3]])
	})

	it('overloaded moveTo', function(){
		parse('m 12.5,52 39,0 0,-40 -39,0 z').should.eql([
			['m', 12.5, 52],
			['l', 39, 0],
			['l', 0, -40],
			['l', -39, 0],
			['z']
		])
	})

	it('curveTo', function(){
		var a = parse('c 50,0 50,100 100,100 50,0 50,-100 100,-100')
		var b = parse('c 50,0 50,100 100,100 c 50,0 50,-100 100,-100')
		a.should.eql([
			['c', 50,0,50,100,100,100],
			['c', 50,0,50,-100,100,-100]
		])
		a.should.eql(b)
	})

	it('lineTo', function(){
		(function(){ parse('l 10 10 0') }).should.throw()
		parse('l 10,10').should.eql([['l', 10,10]])
	})

	it('horizontalTo', function(){
		parse('h 10.5').should.eql([['h', 10.5]])
	})

	it('verticalTo', function(){
		parse('v 10.5').should.eql([['v', 10.5]])
	})

	it('arcTo', function(){
		parse('A 30 50 0 0 1 162.55 162.45').should.eql([
			['A', 30, 50, 0, 0, 1, 162.55, 162.45]
		])
	})

	it('quadratic curveTo', function(){
		parse('M10 80 Q 95 10 180 80').should.eql([
			['M', 10, 80],
			['Q', 95, 10, 180, 80]
		])
	})

	it('smooth curveTo', function(){
		parse('S 1 2, 3 4').should.eql([['S', 1, 2, 3, 4]])
	})

	it('smooth quadratic curveTo', function(){
		(function(){ parse('t 1 2 3') }).should.throw()
		parse('T 1 -2e2').should.eql([['T', 1, -2e2]])
	})

	it('close', function(){
		parse('z').should.eql([['z']])
	})
})