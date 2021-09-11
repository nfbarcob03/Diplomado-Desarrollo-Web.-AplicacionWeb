import { generalRequest, getRequest } from '../../utilities';
import { url_supermarket_ms, port_supermarket_ms, entryPoint_supermarket_ms_products } from './server';

const URL = `http://${url_supermarket_ms}:${port_supermarket_ms}/${entryPoint_supermarket_ms_products}`;

const resolvers = {
	Query: {
		allProducts: (_) =>
			getRequest(URL, ''),
		productById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),
	},
	Mutation: {
		createProduct: (_, { product }) =>(
			generalRequest(`${URL}/`, 'POST', product)
		),
		updateProduct: (_, { id, product }) =>
			generalRequest(`${URL}/${id}`, 'PUT', product),
		deleteProduct: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
	}
};

export default resolvers;
