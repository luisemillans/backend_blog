const jwt =  require('jsonwebtoken')
const AuthorModel =  require('../models/Author')


const verifyToken = async (req) => {
	const Authorization =  req.get('Authorization')
	if(!Authorization){
		return req
	} else{
		const  formatedToken =  Authorization.replace('JWT ',"");
		const payload =  jwt.verify(formatedToken, process.env.SECRET_KEY)
		if(!payload) return req
		const user =  await AuthorModel.findOne({_id:payload._id})
		if(!user) return req;
		return {...req,user}
	}
}

module.exports =  verifyToken;