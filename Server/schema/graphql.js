const graphql = require("graphql");
const bcrypt = require("bcryptjs");
const {
    buildSchema
} = graphql;

const Event = require("../model/eventModel");
const User = require("../model/userModel");

let schema = buildSchema(`

input EventInput{
    title: String!
    description: String!
    price: Float!
    date: String!
}

input UserInput{
    name: String!
    email: String!
    password: String!
}

type Event {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    creator:String!
    date: String!
}

type User {
    _id: String!
    name: String!
    email: String!
    password: String
    createdEvent: [String]
}

type Query{
    event(_id:String):Event!
    events: [Event!]!
    user: User!
}

type Mutation{
    createEvent(eventInput:EventInput): Event
    createUser(userInput: UserInput ): User
}`)

let rootValue = {
    event: async ({ _id }) => {
        let event = await Event.findById(_id);
        return event
    },
    events: async () => {
        let events = await Event.find({});
        return events
    },

    user: async () => {
        let user = await User.find({});
        return user;
    },

    createEvent: async ({ eventInput: { title, description, price, date } }) => {

        let event = await Event.create({
            title,
            description,
            price,
            creator: "5e4d54021d3cca12b08e8651",
            date
        });
        let user = await User.findById("5e4d54021d3cca12b08e8651");
        user.createdEvent.push(event);
        await user.save();
        return event;
    },

    createUser: async ({ userInput: { name, email, password } }) => {
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
}

exports.schema = schema;
exports.rootValue = rootValue;