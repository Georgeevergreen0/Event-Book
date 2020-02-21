const graphql = require("graphql");
const bcrypt = require("bcryptjs");
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLFloat,
    GraphQLList,
    GraphQLString
} = graphql;

const Event = require("../model/eventModel");
const User = require("../model/userModel");

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
            type: GraphQLString
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
})

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
        password: {
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

let Query = new GraphQLObjectType({
    name: "rootQuery",
    fields: {
        events: {
            type: new GraphQLList(EventType),
            resolve: async () => {
                let events = await Event.find({});
                return events
            }
        },
        event: {
            type: EventType,
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

let Mutation = new GraphQLObjectType({
    name: "rootMutation",
    fields: {
        createUser: {
            type: UserType,
            args: {
                name: {
                    type: GraphQLString
                },
                email: {
                    type: GraphQLString
                },
                password: {
                    type: GraphQLString
                },
            },
            resolve: async (_, { name, email, password }) => {
                try {
                    let checkUser = await User.findOne({ email });
                    if (checkUser) {
                        throw new Error("User already exist")
                    }
                    let hash = await bcrypt.hash(password.trim(), 8);
                    user = await User.create({
                        name,
                        email,
                        password: hash
                    });
                    return user;
                } catch (error) {
                    throw error;
                }
            }
        },
        createEvent: {
            type: EventType,
            args: {
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
            },
            resolve: async (_, { title, description, price, date }) => {
                let event = await Event.create({
                    title,
                    description,
                    price,
                    creator: "5e4fa529023a6c09840e8014",
                    date
                });
                return event;
            }
        },

    }
})


module.exports = new GraphQLSchema({ query: Query, mutation: Mutation })
