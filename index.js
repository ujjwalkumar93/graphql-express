const express = require('express');
const body = require('body-parser')
const { graphqlHTTP } = require('express-graphql');
//const {graphqlHttp} = require('express-graphql')
//const graphqlHttp = graphqlHttp1()
const { buildSchema } = require('graphql')
const app = express()
const events = []
app.use(body.json())
app.use('/graphql', graphqlHTTP({
    schema : buildSchema(`
    type event{
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
    }
    input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!
    }
        type RootQuery{
            events: [event!]!
        }
        type RootMutation{
            createEvent(eventInput: EventInput ) : event
        }
        schema{
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {
            return events
        },
        createEvent: (args) => {
            const event = {
                _id: Math.random().toString(),
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: args.eventInput.date
            };
            events.push(event)
            return event
        }
    },
    graphiql: true
}))
// app.get('/', function(req,res){
//     res.send('Hello world');
// })
.listen(8080)