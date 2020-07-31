const express = require('express');
const body = require('body-parser')
const { graphqlHTTP } = require('express-graphql');
//const {graphqlHttp} = require('express-graphql')
//const graphqlHttp = graphqlHttp1()
const { buildSchema } = require('graphql')
const app = express()
app.use(body.json())
app.use('/graphql', graphqlHTTP({
    schema : buildSchema(`
        type RootQuery{
            events: [String!]!
        }
        type RootMutation{
            createEvent(name: String):String
        }
        schema{
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {
            return ['tracking','hacking']
        },
        createEvent: (args) => {
            const eventName = args.name;
            return eventName;
        }
    },
    graphiql: true
}))
// app.get('/', function(req,res){
//     res.send('Hello world');
// })
.listen(8080)