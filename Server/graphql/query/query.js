const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLFloat,
    GraphQLList,
    GraphQLString
} = require("graphql");

const User = require("../../model/userModel");
const Event = require("../../model/eventModel");
const schemaType = require("../schemaType/schemaType");

let Query = new GraphQLObjectType({
    name: "rootQuery",
    fields: {
        events: {
            type: new GraphQLList(schemaType.EventType),
            resolve: async () => {
                let events = await Event.find({});
                return events
            }
        },
        event: {
            type: schemaType.EventType,
            args: {
                _id: {
                    type: GraphQLID
                }
            },
            resolve: async (_, { _id }) => {
                let events = await Event.findById(_id);
                return events
            }
        },

    }
})

module.exports = Query;