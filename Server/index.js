const express = require("express");
const expressqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const app = express();

// mongoose connection;
mongoose.connect("mongodb://127.0.0.1:27017/eventBook", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("connected to database");
});

// graphQL yes
const graphQL = require("./graphql/schema");

//app.use(express.urlencoded({ extended: true }));
app.use("/graphql", expressqlHTTP({
    schema: graphQL,
    graphiql: true
}));

app.listen(4000, () => {
    console.log("Express server running on port 4000");
});
