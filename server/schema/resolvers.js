const { User, Book } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
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
    console.log("user:", user);
    console.log("token:", token);
    const token = signToken(user);
    return { token, user };
  };

  login: async (parent, { email, password }) => {
    const user = User.findOne({ email });
    if (!user) {
      throw new AuthenticationError("Invalid Login Credentials");
    }
    /*const correctPw = await profile.isCorrectPassword(password);
    if (!correctPw) {
      throw new AuthenticationError("Invalid Login Credentials");
    }*/
    const token = signToken(user);
    return { token, user };
  };

  saveBook: async (parent, { bookData }, context) => {
    if (context.user) {
      return User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBook: bookData } },
        { new: true }
      );
    }
    throw new AuthenticationError("You need to log in");
  };

  deleteBook: async (parent, { bookId }, context) => {
    if (context.user) {
      return User.findOneAndUpdate(
        { _id: contex.user._id },
        //remove selected books from the savedBooks Array
        { $pull: { savedBooks: context.bookId } },
        { new: true }
      );
    }
    throw new AuthenticationError("You need to log in");
  };
}
module.exports = resolvers;
