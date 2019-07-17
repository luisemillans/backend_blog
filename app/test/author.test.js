const { graphql } =  require('graphql');
const { schema } =  require('../index');
const AuthorModel =  require('../models/Author');
const setupTest = require('./helpers');


const MUTATION_ADD_AUTHOR = `
mutation addAuthor($data:createAuthorInput!){
	createAuthor(data:$data){
	  _id,
	  first_name,
	  email,
	  password
	}
  }

`

describe("Testing Create Author Mutation", () => {

	beforeEach( async () => await setupTest() );

	it("Should Create Author", async () => {
			const  data = {
				first_name:"prueba",
				last_name:"prueba",
				email:"prueba@prueba.com",
				password:"prueba"
			}
			const res = await graphql(schema,MUTATION_ADD_AUTHOR,null,{},{data})

			expect(res.data.createAuthor).toHaveProperty("_id")

	})

	it("Should not create Author", async () => {
		const  data = {
			first_name:"prueba",
			last_name:"prueba",
			email:"prueba@prueba.com",
			password:"prueba"
		}
		await AuthorModel.create(data);
		const res = await graphql(schema,MUTATION_ADD_AUTHOR,null,{},{data})
		expect(res).toHaveProperty("errors");
	})
 

})


const MUTATION_ADD_POST = `
mutation addPost($data:createPostAuthor!){
	createPost(data:$data){
	  _id,
	  title,
	  author{
		_id,
		first_name
	  }
	}
  }

`

describe("Testing Create Post Mutation", async() => {

	beforeEach( async () => await setupTest() );


	it("Should Create Post", async () => {
		const  author = {
			first_name:"prueba",
			last_name:"prueba",
			email:"prueba@prueba.com",
			password:"prueba"
		}
		const data = {
			title : "Post Prueba",
			content: "Este es un post de prueba"
		}

		const user  = await AuthorModel.create(author)
		const res = await graphql(schema,MUTATION_ADD_POST,null,{user},{data})

		expect(res.data.createPost).toHaveProperty("_id")
		expect(res.data.createPost.author).toHaveProperty("_id")


})

it("Should Not Create Post", async () => {
	const  author = {
		first_name:"prueba",
		last_name:"prueba",
		email:"prueba@prueba.com",
		password:"prueba"
	}
	const data = {
		content: "Este es un post de prueba"
	}

	const user  = await AuthorModel.create(author)
	const res = await graphql(schema,MUTATION_ADD_POST,null,{user},{data})

	expect(res).toHaveProperty("errors")
	

})



})