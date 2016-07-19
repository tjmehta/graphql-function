var assertErr = require('assert-err')
var GraphQLError = require('graphql/error').GraphQLError
var GraphQLScalarType = require('graphql').GraphQLScalarType
var Kind = require('graphql/language').Kind

var parseFn = function (str, Err, message, data) {
  try {
    return eval('(' + str + ')')
  } catch (e) {
    throw new Err(message, data)
  }
}

module.exports = new GraphQLScalarType({
  name: 'Function',
  /**
   * Serialize function value into string
   * @param  {Function} value function value
   * @return {String} function as string
   */
  serialize: function (value) {
    assertErr(typeof value === 'function',
      TypeError, 'Field error: value must be a function')
    return value.toString()
  },
  /**
   * Parse value into function
   * @param  {*} value serialized function value
   * @return {Function} function value
   */
  parseValue: function (value) {
    assertErr(typeof value === 'string',
      TypeError, 'Field error: value must be a string')
    return parseFn(value, TypeError, 'Field error: value is an invalid function string')
  },
  /**
   * Parse ast literal to function
   * @param  {Object} ast graphql ast
   * @return {Function} function value
   */
  parseLiteral: function (ast) {
    assertErr(ast.kind === Kind.STRING,
      GraphQLError, 'Query error: "ast.kind" must be a string not a: ' + ast.kind, [ast])
    return parseFn(ast.value,
      GraphQLError, 'Field error: value is an invalid function string', [ast])
  }
})
