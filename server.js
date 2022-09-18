const { ApolloServer } = require('apollo-server');
const {
    ApolloServerPluginLandingPageLocalDefault
} = require('apollo-server-core');
const db = require('./db');
const fs = require('fs');

// schema definitions
const typeDefs = fs.readFileSync('./schema.graphql', { encoding: 'utf-8' })

// resolvers contain query and mutations
const resolvers = {
    Query: {
        test: () => 'GraphQL server is up & running !!',
        books: () => db.books.list(),
        students: () => db.students.list(),
        colleges: () => db.colleges.list(),
        studentById: (root, args, context, info) => {
            return db.students.get(args.id);
        },
        collegeById: (root, args, context, info) => {
            return db.colleges.get(args.id);
        }
    },
    Mutation: {
        addBook: (parent, args) => {
            return db.books.create(args);
        },
    },
}

const app = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
        ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
});

app.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});