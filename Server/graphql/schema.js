const {
    GraphQLSchema,
} = require("graphql");

const query = require("./query/query");
const mutation = require("./mutation/mutation");

module.exports = new GraphQLSchema({ query, mutation })
