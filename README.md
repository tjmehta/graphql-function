# graphql-function [![Build Status](https://travis-ci.org/tjmehta/graphql-function.svg)](https://travis-ci.org/tjmehta/graphql-function) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)
GraphQL Function Type

# Installation
```bash
npm i --save graphql-function
```

# Usage
```js
var GraphQLFunction = require('graphql-function')

// Use graphql-function in your GraphQL objects for Function properties
var fooType = new GraphQLObjectType({
  name: 'Foo',
  description: 'Some foo function',
  fields: {
    add: {
      function: GraphQLFunction,
      description: 'Function that adds two numbers'
    },
  }
});

var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    foo: {
      function: fooType,
      resolve: function () {
        // ...
      },
    },
  }
})
```

# License
MIT