import { generalRequest, getRequest } from '../../utilities';
import { url_supermarket_ms, port_supermarket_ms, entryPoint_supermarket_ms_categories } from './server';

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

export default resolvers;
