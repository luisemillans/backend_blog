const  { SchemaDirectiveVisitor }  = require('graphql-tools');
const { defaultFieldResolver }  =  require('graphql');


class AuthDirective extends SchemaDirectiveVisitor{

	visitFieldDefinition(field){
		const { resolve = defaultFieldResolver } = field;
		field.resolve = async function (...args){
			const [ , , context] =  args;
			if(context.user){
				return await resolve.apply(this,args);
			}else{
				throw new Error("Necesitas Estar Autenticado ")
			}
		}
	}

}

module.exports = {
	AuthDirective
}