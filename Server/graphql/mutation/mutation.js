const {
    GraphQLObjectType,
    GraphQLFloat,
    GraphQLString,
    GraphQLID
} = require("graphql");
const bcrypt = require("bcryptjs");
const User = require("../../model/userModel");
const Event = require("../../model/eventModel");
const { UserType, EventType } = require("../schemaType/schemaType");


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
                    createdBy: "5e50d7a20b87ac1280dd41d6",
                    date
                });
                return event;
            }
        },
        bookEvent: {
            type: EventType,
            args: {
                _id: {
                    type: GraphQLID
                },
            },
            resolve: async (_, { _id }) => {
                let event = await Event.findById(_id);
                event.bookedBy.push("5e50d7a20b87ac1280dd41d6");
                await event.save()
                return event;
            }
        },
        cancelEvent: {
            type: EventType,
            args: {
                _id: {
                    type: GraphQLID
                },
            },
            resolve: async (_, { _id }) => {
                let event = await Event.findById(_id);
                event.bookedBy.pull("5e50d7a20b87ac1280dd41d6");
                await event.save()
                return event;
            }
        },

    }
})

module.exports = Mutation;