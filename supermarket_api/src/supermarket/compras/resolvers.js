import { generalRequest, getRequest } from '../../utilities';
import { url_compras_ms, port_compras_ms, entryPoint_compras } from './server';
import { url_supermarket_ms, port_supermarket_ms, entryPoint_supermarket_ms_products } from '../../supermarket/products/server';

const URL_compras = `http://${url_compras_ms}:${port_compras_ms}/${entryPoint_compras}`;
const URL_productos = `http://${url_supermarket_ms}:${port_supermarket_ms}/${entryPoint_supermarket_ms_products}`;

let bandera
let compraModificada
const resolvers = {
	Query: {
		allCompras: (_) =>
			getRequest(URL_compras, ''),
		compraById: (_, { id }) =>
			generalRequest(`${URL_compras}/${id}`, 'GET'),
	},
	Mutation: {
		 createCompra: async (_, { compra }) => (
			bandera,compraModificada = await validarProductosCompra(compra),
			bandera? generalRequest(`${URL_compras}/`, 'POST', compraModificada):null	
		),
			
		updateCompra: (_, { id, compra }) =>(
			bandera,compraModificada = validarProductosCompra(compra),
			bandera?generalRequest(`${URL_compras}/${id}`, 'PUT', compraModificada):compraModificada
		),
			
		deleteCompra: (_, { id }) =>
			generalRequest(`${URL_compras}/${id}`, 'DELETE')
	}
};

async  function validarProductosCompra(compra){
	bandera = true
	let producto
	compraModificada = Object.assign({}, compra);
	compraModificada.productos = []
	try{
		for (producto of compra.productos){
			let producto_back_ms_compras =  await generalRequest(`${URL_productos}/${producto.id}`, 'GET')
			let producto_back_ms_producs = Object.assign({}, producto_back_ms_compras);
			let new_quantity_ms_products = producto_back_ms_producs.quantity - producto.quantity
			if (new_quantity_ms_products < 0){
				bandera= false
			}else{
				producto_back_ms_producs.quantity = new_quantity_ms_products
				console.log(producto_back_ms_producs)
				let category = producto_back_ms_compras.category.id
				producto_back_ms_producs.category = category
				let producto_back_ms_producs_modify =  await generalRequest(`${URL_productos}/${producto.id}`, 'PUT',producto_back_ms_producs)
				
				producto_back_ms_compras.category = category
				producto_back_ms_compras.quantity = producto.quantity
				compraModificada.productos.push(producto_back_ms_compras)
			}
		}
		return bandera,compraModificada
	}catch (error){
		bandera = false
		return bandera,error
	}
	
};


export default resolvers;
