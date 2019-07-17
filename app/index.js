require('dotenv').config();
const { GraphQLServer } =  require('graphql-yoga');
const { importSchema } = require('graphql-import');
const { makeExecutableSchema } = require('graphql-tools')
const mongoose =  require('mongoose');
const resolvers =  require('./resolvers');
const typeDefs = importSchema(__dirname + '/schema.graphql');
const { AuthDirective } = require('./resolvers/directives');
const verifyToken =  require('./utils/verifyToken');


const MONGO_URI =  process.env.NODE_ENV == 'test'?process.env.MONGO_URI_TEST:process.env.MONGO_URI_DEV; 

mongoose.connect(MONGO_URI,{ useNewUrlParser: true })

const mongo =  mongoose.connection;

mongo.on('error', (error) => console.log(error))
	 .once('open', () => console.log("Connected to database"));

/* const resolvers = {
	Query:{
		prueba: () => "Hola desde graphql",
		saludo: (_,{texto}) => `Hola ${texto}`
	}
} */

const schema =  makeExecutableSchema({
	typeDefs,
	resolvers,
	schemaDirectives:{
		auth:AuthDirective
	}
})

const server =  new GraphQLServer({
	schema,
	context: async({request}) => verifyToken(request) 
})

const options = {
	cors:{
		origin:"*"
	}
}

server.start(options,() => console.log("Server is working in port 4000"));


module.exports = { schema };
