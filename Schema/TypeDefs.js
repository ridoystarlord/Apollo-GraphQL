const { gql } =require('apollo-server-express');

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Mutation{
    create(
        title: String,
        author: String
    ):String
  }

  type Query {
    results: [Book!]!
  }
`;

module.exports={
    typeDefs
}