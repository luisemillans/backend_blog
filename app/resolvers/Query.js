const AuthorModel =  require('../models/Author');
const PostModel =  require('../models/Post');

const listAuthors =  async(root,params,context,info) => {
	const authors = await AuthorModel.find({is_active:true}).populate('posts');
	console.log(authors);
	return authors
}

const singleAuthor  =  async(root,params,context,info) => {

	const author =  await AuthorModel.findById(params.id).posts('posts');
	if (!author) throw new Error("Author no existe");

	return author.toObject();
}

const listPosts =  async(root, params, context, info) => {

	const posts =  await PostModel.find({is_active:true}).populate('author');
	return posts
}

const singlePost = async(root,params, context, info) => {

	const post = await PostModel.findById(params.id).populate('author');
	if(!post) throw new Error("Post no existe")

	return post.toObject();

}

module.exports = {
	listAuthors,
	singleAuthor,
	listPosts,
	singlePost
}