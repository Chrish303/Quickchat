const { GraphQLServer, PubSub } = require("graphql-yoga");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const pubsub = new PubSub();

const typeDefs = `
  type Message {
    id: ID!
    userId: String!
    user: String!
    content: String!
  }

  type Query {
    messages: [Message!]
  }

  type Mutation {
    postMessage(userId: String!, user: String!, content: String!): ID!
  }

  type Subscription {
    messages: [Message!]
  }
`;

const resolvers = {
  Query: {
    messages: async () => {
      return await prisma.message.findMany();
    },
  },
  Mutation: {
    postMessage: async (parent, { userId, user, content }, { pubsub }) => {
      const message = await prisma.message.create({
        data: {
          userId,
          user,
          content,
        },
      });
      pubsub.publish("MESSAGES", { messages: await prisma.message.findMany() });
      return message.id;
    },
  },
  Subscription: {
    messages: {
      subscribe: (parent, args, { pubsub }) => {
        return pubsub.asyncIterator("MESSAGES");
      },
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: { pubsub, prisma },
});

server.start(({ port }) => {
  console.log(`Server is running on http://localhost:${port}/`);
});
