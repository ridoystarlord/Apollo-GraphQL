const { collection } = require("../Database/Database");

const resolvers = {
    Query: {
      results: async() => await collection.find({}).toArray(),
    },
    Mutation:{
     create: async(parent,args) => {
        const id=await collection.insertOne(args)
        if (id) {
            return "Success"
        }else{
            return "Failed"
        }
     },
    }
  };

module.exports={
    resolvers
}