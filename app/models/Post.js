const mongoose =  require('mongoose');

const Schema =  mongoose.Schema


const PostSchema =  new Schema({

	title:{
		type:String,
		required:true
	},
	content:{
		type:String,
		required:true
	},	
	author:{
		type:Schema.Types.ObjectId,
		ref:'authors'
	},
	cover_photo:{
		type:String
	},
	likes:{
		type:Number
	},
	is_active:{
		type:Boolean,
		default:true,
	}
}, { collection:"posts", timestamps:true } )

module.exports = mongoose.model('posts',PostSchema);