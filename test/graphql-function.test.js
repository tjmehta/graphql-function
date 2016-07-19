var describe = global.describe
var it = global.it

var expect = require('chai').expect
var Kind = require('graphql/language').Kind

var GraphQLFunction = require('../index.js')

describe('GraphQLFunction', function () {
  describe('serialize', function() {
    it('should error when serializing a non-function value', function () {
      var str = '2015-07-24T10:56:42.744Z'
      expect(
        GraphQLFunction.serialize.bind(GraphQLFunction, str)
      ).to.throw(/value must be a function/)
    })

    it('should serialize a function value', function () {
      var fn = function () {}
      expect(
        GraphQLFunction.serialize(fn)
      ).to.equal(fn.toString())
    })
  })

  describe('parseValue', function () {
    it('should error when serializing a non-string value', function () {
      var val = 2
      expect(
        GraphQLFunction.parseValue.bind(GraphQLFunction, val)
      ).to.throw(/value must be a string/)
    })

    it('should error when serializing an invalid string value', function () {
      var str = 'invalid'
      expect(
        GraphQLFunction.parseValue.bind(GraphQLFunction, str)
      ).to.throw(/invalid function string/)
    })

    it('should parse a value to function', function () {
      var fn = function () {}
      var str = fn.toString()
      var parsed = GraphQLFunction.parseValue(str)
      expect(parsed).to.be.an.instanceOf(Function)
      expect(parsed.toString()).to.equal(str)
    })
  })

  describe('parseLiteral', function () {
    it('should error when parsing a ast int', function () {
      var ast = {
        kind: Kind.INT
      }
      expect(
        GraphQLFunction.parseLiteral.bind(GraphQLFunction, ast)
      ).to.throw(/must be a string/)
    })

    it('should error when parsing ast w/ invalid value', function () {
      var ast = {
        kind: Kind.STRING,
        value: 'invalid'
      }
      expect(
        GraphQLFunction.parseLiteral.bind(GraphQLFunction, ast)
      ).to.throw(/invalid function/)
    })

    it('should parse a ast literal', function () {
      var fn = function hey () {}
      var ast = {
        kind: Kind.STRING,
        value: fn.toString()
      }
      var parsed = GraphQLFunction.parseLiteral(ast)
      expect(parsed).to.be.an.instanceOf(Function)
      expect(parsed.toString()).to.equal(ast.value)
    })
  })
})