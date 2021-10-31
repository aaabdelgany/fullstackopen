const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require('apollo-server');
const { v1: uuid } = require('uuid');
const mongoose = require('mongoose');
const Author = require('./models/Author');
const Book = require('./models/Book');
const User = require('./models/User');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

let MONGODB_URI = '';
process.env.ENV === 'DEV'
  ? (MONGODB_URI = process.env.DEV_MONGODB_URI)
  : (MONGODB_URI = process.env.MONGODB_URI);
console.log('connecting to', MONGODB_URI);
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message);
  });

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Author {
    name: String!
    born: String
    bookCount: Int!
    id: ID!
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      published: String!
      author: String!
      genres: [String]!
    ): Book
    editAuthor(name: String!, setBornTo: String!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.genre) {
        return await Book.find({ genres: args.genre });
      }
      // if (args.author) {
      //   return books.filter((book) => book.author === args.author);
      // } else if (args.genre) {
      //   return books.filter((book) => book.genres.includes(args.genre));
      // } else {
      //   return books;
      // }
      return await Book.find({});
    },
    allAuthors: () => {
      return Author.find({});
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }
      if (await Book.findOne({ title: args.title })) {
        throw new UserInputError('Book Already Exists!', {
          invalidArgs: args.name,
        });
      }
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        if (args.author.length < 4) {
          throw new UserInputError(
            'Author names must be 4 characters or more!',
            {
              invalidArgs: args.author,
            }
          );
        }
        author = new Author({ name: args.author });
        await author.save();
      }
      if (args.title.length < 2) {
        throw new UserInputError('Titles must be 2 characters or more!', {
          invalidArgs: args.author,
        });
      }
      const book = new Book({ ...args, author: author.id });
      return book.save();
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }
      const author = await Author.findOne({ name: args.name });
      if (author) {
        author.born = args.setBornTo;
        return author.save();
      } else {
        throw new UserInputError('Author Not Found!', {
          invalidArgs: args.name,
        });
      }
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });
      try {
        return await user.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args.username,
        });
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== 'password') {
        throw new UserInputError('wrong credentials', {
          invalidArgs: args.password,
        });
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };
      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
