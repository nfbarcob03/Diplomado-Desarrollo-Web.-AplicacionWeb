import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';

import {categoryMutations,categoryQueries,categoryTypeDef} from './supermarket/categories/typeDefs';
import {productMutations,productQueries,productTypeDef} from './supermarket/products/typeDefs';
import {compraMutations,compraQueries,compraTypeDef} from './supermarket/compras/typeDefs';

import categoryResolvers from './supermarket/categories/resolvers';
import productResolvers from './supermarket/products/resolvers';
import compraResolvers from './supermarket/compras/resolvers';

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		categoryTypeDef,
		productTypeDef,
		compraTypeDef,
	],
	[
		categoryQueries,
		productQueries,
		compraQueries,
	],
	[
		categoryMutations,
		productMutations,
		compraMutations,
	]
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		categoryResolvers,
		productResolvers,
		compraResolvers,
	)
});
