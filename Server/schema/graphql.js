const graphql = require("graphql");
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
        let events = await Event.find();
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
            date
        })
        return event;
    },
    createUser: async ({ userInput: { name, email, password } }) => {
        let user = await User.create({
            name,
            email,
            password,
        })
        return user;
    }
}

exports.schema = schema;
exports.rootValue = rootValue;