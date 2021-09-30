const { User, Book } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    books: async () => {
      return Book.find();
    },
    book: async (parent, { bookId }, context) => {
      return Book.findOne({ bookId });
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("books");
    },

    me: async (parent, { _id }, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("books");
      }

      throw new AuthenticationError("You need to log in");
    },
  },
};
Mutation: {
  createUser: async (parent, { username, email, password }) => {
    const user = await User.create({ username, email, password });
    const token = signToken(user);
    return { token, user };
  };

  login: async (parent, { email, password }) => {
    const user = User.findOne({ email });
    if (!user) {
      throw new AuthenticationError("Invalid Login Credentials");
    }
    const correctPw = await profile.isCorrectPassword(password);
    if (!correctPw) {
      throw new AuthenticationError("Invalid Login Credentials");
    }
    const token = signToken(user);
    return { token, user };
  };

  saveBook: async (parent, { _id }, context) => {
    if (context.user) {
      return User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { book: context.books } },
        { new: true, runValidators: true }
      );
    }
    throw new AuthenticationError("You need to log in");
  };

  deleteBook: async (parent, { bookId }, context) => {
    if (context.user) {
      return User.findOneAndUpdate(
        { _id: contex.user._id },
        { $pull: { bookId: context.bookId } },
        { new: true }
      );
    }
    throw new AuthenticationError("You need to log in");
  };
}
module.exports = resolvers;
