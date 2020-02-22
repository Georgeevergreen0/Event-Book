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
        createdAt: {
            type: GraphQLString
        },
        createdEvent: {
            type: new GraphQLList(EventType),
            resolve: async (parent) => {
                let events = await Event.find({ createdBy: parent._id });
                return events
            }
        },
        bookedEvent: {
            type: new GraphQLList(EventType),
            resolve: async (parent) => {
                let events = await Event.find({ bookedBy: parent._id });
                return events
            }
        },

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
        date: {
            type: GraphQLString
        },
        createdAt: {
            type: GraphQLString
        },
        updatedAt: {
            type: GraphQLString
        },
        createdBy: {
            type: UserType,
            resolve: async (parent) => {
                let user = await User.findById(parent.createdBy);
                return user
            }
        },
        bookedBy: {
            type: new GraphQLList(UserType),
            resolve: async (parent) => {
                let user = await User.find({ _id: { $in: parent.bookedBy } });
                return user
            }
        }
    })
});

module.exports = { UserType, EventType };