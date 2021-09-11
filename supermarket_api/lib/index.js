'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Koa = _interopDefault(require('koa'));
var KoaRouter = _interopDefault(require('koa-router'));
var koaLogger = _interopDefault(require('koa-logger'));
var koaBody = _interopDefault(require('koa-bodyparser'));
var koaCors = _interopDefault(require('@koa/cors'));
var apolloServerKoa = require('apollo-server-koa');
var merge = _interopDefault(require('lodash.merge'));
var GraphQLJSON = _interopDefault(require('graphql-type-json'));
var graphqlTools = require('graphql-tools');
var request = _interopDefault(require('request-promise-native'));
var graphql = require('graphql');

/**
 * Creates a request following the given parameters
 * @param {string} url
 * @param {string} method
 * @param {object} [body]
 * @param {boolean} [fullResponse]
 * @return {Promise.<*>} - promise with the error or the response object
 */
async function generalRequest(url, method, body, fullResponse) {
	const parameters = {
		method,
		uri: encodeURI(url),
		body,
		json: true,
		resolveWithFullResponse: fullResponse
	};
	if (process.env.SHOW_URLS) {
		// eslint-disable-next-line
		console.log(url);
	}

	try {
		return await request(parameters);
	} catch (err) {
		return err;
	}
}

/**
 * Adds parameters to a given route
 * @param {string} url
 * @param {object} parameters
 * @return {string} - url with the added parameters
 */
function addParams(url, parameters) {
	let queryUrl = `${url}?`;
	for (let param in parameters) {
		// check object properties
		if (
			Object.prototype.hasOwnProperty.call(parameters, param) &&
			parameters[param]
		) {
			if (Array.isArray(parameters[param])) {
				queryUrl += `${param}=${parameters[param].join(`&${param}=`)}&`;
			} else {
				queryUrl += `${param}=${parameters[param]}&`;
			}
		}
	}
	return queryUrl;
}

/**
 * Generates a GET request with a list of query params
 * @param {string} url
 * @param {string} path
 * @param {object} parameters - key values to add to the url path
 * @return {Promise.<*>}
 */
function getRequest(url, path, parameters) {
	const queryUrl = addParams(`${url}/${path}`, parameters);
	return generalRequest(queryUrl, 'GET');
}

/**
 * Merge the schemas in order to avoid conflicts
 * @param {Array<string>} typeDefs
 * @param {Array<string>} queries
 * @param {Array<string>} mutations
 * @return {string}
 */
function mergeSchemas(typeDefs, queries, mutations) {
	return `${typeDefs.join('\n')}
    type Query { ${queries.join('\n')} }
    type Mutation { ${mutations.join('\n')} }`;
}

function formatErr(error) {
	const data = graphql.formatError(error);
	const { originalError } = error;
	if (originalError && originalError.error) {
		const { path } = data;
		const { error: { id: message, code, description } } = originalError;
		return { message, code, description, path };
	}
	return data;
}

const categoryTypeDef = `
  type Category {
      id: Int!
      name: String!
      description: String!
  }
  input CategoryInput {
      name: String!
      description: String!
  }`;

const categoryQueries = `
      allCategories: [Category]!
      categoryById(id: Int!): Category!
  `;

const categoryMutations = `
    createCategory(category: CategoryInput!): Category!
    updateCategory(id: Int!, category: CategoryInput!): Category!
    deleteCategory(id: Int!): Int
`;

const productTypeDef = `
  type CategoryProduct {
    id: Int!
    name: String
    description: String
  }
  type Product {
      id: Int!
      name: String
      description: String
      category: CategoryProduct
      unit_measurement: String
      quantity:Int!
      precio_unitario:Float!
  }
  input ProductInput {
     name: String!
     description: String!
     category: Int!
     unit_measurement: String!
     quantity: Int!
     precio_unitario:Float!
  }`;

const productQueries = `
      allProducts: [Product]!
      productById(id: Int!): Product!
  `;

const productMutations = `
    createProduct(product: ProductInput!): Product!
    updateProduct(id: Int!, product: ProductInput!): Product!
    deleteProduct(id: Int!): Int
`;

const compraTypeDef = `
  type ProductoCompra{
      id:Int!
      name:String!
      description: String
      category: Int
      unit_measurement: String
      quantity:Int
      precio_unitario:Float
  }
  input ProductoCompraInput{
    id:Int!
    quantity:Float!
    name:String
}
  type Compra {
      id: Int!
      usuarioName: String!
      usuarioId: Int!
      subtotal: Float!
      total: Float!
      marcaTiempo: String!
      productos:[ProductoCompra]!
      
  }
  input CompraInput {
        usuarioName: String!
        usuarioId: Int!
        productos:[ProductoCompraInput]!
  }`;

const compraQueries = `
      allCompras: [Compra]!
      compraById(id: Int!): Compra!
  `;

const compraMutations = `
    createCompra(compra: CompraInput!): Compra!
    updateCompra(id: Int!, compra: CompraInput!): Compra!
    deleteCompra(id: Int!): Int
`;

const url_supermarket_ms = 'host.docker.internal';
const port_supermarket_ms = '4000';
const entryPoint_supermarket_ms_categories = 'categories';

const URL = `http://${url_supermarket_ms}:${port_supermarket_ms}/${entryPoint_supermarket_ms_categories}`;

const resolvers = {
	Query: {
		allCategories: (_) =>
			getRequest(URL, ''),
		categoryById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),
	},
	Mutation: {
		createCategory: (_, { category }) =>
			generalRequest(`${URL}/`, 'POST', category),
		updateCategory: (_, { id, category }) =>
			generalRequest(`${URL}/${id}`, 'PUT', category),
		deleteCategory: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
	}
};

const url_supermarket_ms$1 = 'host.docker.internal';
const port_supermarket_ms$1 = '4000';
const entryPoint_supermarket_ms_products = 'products';

const URL$1 = `http://${url_supermarket_ms$1}:${port_supermarket_ms$1}/${entryPoint_supermarket_ms_products}`;

const resolvers$1 = {
	Query: {
		allProducts: (_) =>
			getRequest(URL$1, ''),
		productById: (_, { id }) =>
			generalRequest(`${URL$1}/${id}`, 'GET'),
	},
	Mutation: {
		createProduct: (_, { product }) =>(
			generalRequest(`${URL$1}/`, 'POST', product)
		),
		updateProduct: (_, { id, product }) =>
			generalRequest(`${URL$1}/${id}`, 'PUT', product),
		deleteProduct: (_, { id }) =>
			generalRequest(`${URL$1}/${id}`, 'DELETE')
	}
};

const url_compras_ms = 'host.docker.internal';
const port_compras_ms = '8080';
const entryPoint_compras = 'compras';

const URL_compras = `http://${url_compras_ms}:${port_compras_ms}/${entryPoint_compras}`;
const URL_productos = `http://${url_supermarket_ms$1}:${port_supermarket_ms$1}/${entryPoint_supermarket_ms_products}`;

let bandera;
let compraModificada;
const resolvers$2 = {
	Query: {
		allCompras: (_) =>
			getRequest(URL_compras, ''),
		compraById: (_, { id }) =>
			generalRequest(`${URL_compras}/${id}`, 'GET'),
	},
	Mutation: {
		 createCompra: async (_, { compra }) => (
			compraModificada = await validarProductosCompra(compra), bandera? generalRequest(`${URL_compras}/`, 'POST', compraModificada):null),
			
		updateCompra: (_, { id, compra }) =>(
			compraModificada = validarProductosCompra(compra), bandera?generalRequest(`${URL_compras}/${id}`, 'PUT', compraModificada):compraModificada),
			
		deleteCompra: (_, { id }) =>
			generalRequest(`${URL_compras}/${id}`, 'DELETE')
	}
};

async  function validarProductosCompra(compra){
	bandera = true;
	let producto;
	compraModificada = Object.assign({}, compra);
	compraModificada.productos = [];
	try{
		for (producto of compra.productos){
			let producto_back_ms_compras =  await generalRequest(`${URL_productos}/${producto.id}`, 'GET');
			let producto_back_ms_producs = Object.assign({}, producto_back_ms_compras);
			let new_quantity_ms_products = producto_back_ms_producs.quantity - producto.quantity;
			if (new_quantity_ms_products < 0){
				bandera= false;
			}else{
				producto_back_ms_producs.quantity = new_quantity_ms_products;
				console.log(producto_back_ms_producs);
				let category = producto_back_ms_compras.category.id;
				producto_back_ms_producs.category = category;
				let producto_back_ms_producs_modify =  await generalRequest(`${URL_productos}/${producto.id}`, 'PUT',producto_back_ms_producs);
				
				producto_back_ms_compras.category = category;
				producto_back_ms_compras.quantity = producto.quantity;
				compraModificada.productos.push(producto_back_ms_compras);
			}
		}
		return compraModificada
	}catch (error){
		bandera = false;
		return error
	}
	
}

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
var graphQLSchema = graphqlTools.makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		resolvers,
		resolvers$1,
		resolvers$2,
	)
});

const app = new Koa();
const router = new KoaRouter();
const PORT = process.env.PORT || 5000;

app.use(koaLogger());
app.use(koaCors());

// read token from header
app.use(async (ctx, next) => {
	if (ctx.header.authorization) {
		const token = ctx.header.authorization.match(/Bearer ([A-Za-z0-9]+)/);
		if (token && token[1]) {
			ctx.state.token = token[1];
		}
	}
	await next();
});

// GraphQL
const graphql$1 = apolloServerKoa.graphqlKoa((ctx) => ({
	schema: graphQLSchema,
	context: { token: ctx.state.token },
	formatError: formatErr
}));
router.post('/graphql', koaBody(), graphql$1);
router.get('/graphql', graphql$1);

// test route
router.get('/graphiql', apolloServerKoa.graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());
// eslint-disable-next-line
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
