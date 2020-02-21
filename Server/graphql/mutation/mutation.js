const {
    GraphQLObjectType,
    GraphQLFloat,
    GraphQLString
} = require("graphql");
const bcrypt = require("bcryptjs");
const User = require("../../model/userModel");
const Event = require("../../model/eventModel");
const schemaType = require("../schemaType/schemaType");


let Mutation = new GraphQLObjectType({
    name: "rootMutation",
    fields: {
        createUser: {
            type: schemaType.UserType,
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
            type: schemaType.EventType,
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

module.exports = Mutation;