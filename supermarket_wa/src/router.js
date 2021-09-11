import vueRouter from 'vue-router'
import App from './App'
import User from './components/User'
import Categories from './components/CategoryComponents/Categories'
import CategoriesById from './components/CategoryComponents/CategoriesById'
import AllCategories from './components/CategoryComponents/AllCategories'
import CreateCategory from './components/CategoryComponents/CreateCategory'
import Products from './components/ProductComponent/Products'
import AllProducts from './components/ProductComponent/AllProducts'
import ProductById from './components/ProductComponent/ProductById'
import CreateProducts from './components/ProductComponent/CreateProduct'
import Compras from './components/CompraComponent/Compra'
import AllCompras from './components/CompraComponent/AllCompras'

const router = new vueRouter({
        mode: 'history',
        base: __dirname,
        routes: [
            {
                path: '/',
                name: "root",
                component: App
            },
            {
                path: '/user/:username',
                name: "user",
                component: User
            },
            {
                path: '/user/:username/categories/',
                name: "categories",
                component: Categories
            },
            {
                path: '/user/:username/categories/categoriesById',
                name: "categoriesById",
                component: CategoriesById
            },
            {
                path: '/user/:username/categories/allCategories',
                name: "allCategories",
                component: AllCategories
            },
            {
                path: '/user/:username/categories/createCategory',
                name: "createCategory",
                component: CreateCategory
            },
            {
                path: '/user/:username/products/',
                name: "products",
                component: Products
            },
            {
                path: '/user/:username/products/allProducts',
                name: "allProducts",
                component: AllProducts
            },
            {
                path: '/user/:username/products/productById',
                name: "productById",
                component: ProductById
            },
            {
                path: '/user/:username/products/createProduct',
                name: "createProduct",
                component: CreateProducts 
            },
            {
                path: '/user/:username/compras/',
                name: "compras",
                component: Compras
            },
            {
                path: '/user/:username/compras/allCompras',
                name: "allCompras",
                component: AllCompras
            },
            
            

        ]
    })

export default router