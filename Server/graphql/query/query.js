const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLList,
} = require("graphql");

const User = require("../../model/userModel");
const Event = require("../../model/eventModel");
const { UserType, EventType } = require("../schemaType/schemaType");

let Query = new GraphQLObjectType({
    name: "rootQuery",
    fields: {
        event: {
            type: EventType,
            args: {
                _id: {
                    type: GraphQLID
                }
            },
            resolve: async (_, { _id }) => {
                let event = await Event.findById(_id);
                return event
            }
        },
        events: {
            type: new GraphQLList(EventType),
            resolve: async () => {
                let events = await Event.find({});
                return events
            }
        },

    }
})

module.exports = Query;