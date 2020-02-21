const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLList,
    GraphQLString,
    GraphQLFloat
} = require("graphql");

const User = require("../../model/userModel");
const Event = require("../../model/eventModel");

let UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        _id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        createdEvent: {
            type: new GraphQLList(EventType),
            resolve: async (parent) => {
                let events = await Event.find({ creator: parent._id });
                return events
            }
        }

    })
})

let EventType = new GraphQLObjectType({
    name: "Event",
    fields: () => ({
        _id: {
            type: GraphQLID
        },
        title: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        price: {
            type: GraphQLFloat
        },
        creator: {
            type: GraphQLString
        },
        date: {
            type: GraphQLString
        },
        createdBy: {
            type: UserType,
            resolve: async (parent) => {
                let user = await User.findById(parent.creator);
                return user
            }
        }
    })
});

module.exports = { UserType, EventType };