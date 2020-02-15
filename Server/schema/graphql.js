const graphql = require("graphql");
const { buildSchema } = graphql;
const Event = require("../model/eventModel");

let schema = buildSchema(`
input EventInput{
    title: String!
    description: String!
    price: Float!
    date: String!
}
type Event {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
}
type Query{
    event(_id:String):Event!
    events: [Event!]!
}
type Mutation{
    createEvent(eventInput:EventInput): Event!
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
    createEvent: async ({ eventInput: { title, description, price, date } }) => {
        let event = await Event.create({
            title,
            description,
            price,
            date
        })
        return event;
    }
}

exports.schema = schema;
exports.rootValue = rootValue;
