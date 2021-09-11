
<template>
    <div id="Prodcuts">
        <h2>Usuario autenticado: <span>{{username}}</span></h2>
        <h1 v-if="producto_found">El producto con id = <span>{{id_mostrar}}</span>, tiene el nombre <span>{{name_mostrar}}</span> y su descripción es «<span>{{description_mostrar}}</span>». A continuación se muestra mas detalles sobre este prodcuto.</h1>
        <label for="productId"> Ingrese el ID del producto</label>
        <input type="number" id ="productId" name = "productId" v-model="product_id" placeholder="prodcuto ID" :disabled="producto_found">
        <button v-on:click="getProduct" v-if="!producto_found">Obtener producto</button>
        

        <div id="editar_producto" v-if="producto_found">
            <h2 > Editar producto </h2>
            <label for="text"> Ingrese el nombre del producto</label>
            <input type="name" id ="name" name = "name" v-model="name" placeholder="Nombre">
            <label for="description"> Ingrese la description del producto</label>
            <input type="text" id ="description" name = "description" v-model="description" placeholder="Descripcion">
            <label for="quantity"> Ingrese la cantidad del producto</label>
            <input type="number" id ="quantity" name = "quantity" v-model="quantity" placeholder="Cantidad">
            <label for="precio_unitario"> Ingrese precio unitario del producto</label>
            <input type="number" id ="precio_unitario" name = "precio_unitario" v-model="precio_unitario" placeholder="Precio unitario">
            <label for="category"> Seleccione la categoria del producto</label>
             <select  class="form-control" id="category" v-model="category">
                <option  v-for="category in allCategories" :value="category.id" :key="category.id">{{category.name}}</option>
            </select>
            <label for="unit_messu"> Seleccione la unidad de medida del producto</label>
             <select  class="form-control" id="unit_measurement" v-model="unit_measurement">
                <option  v-for="messure in units_mesusre" :value="messure" :key="messure">{{messure}}</option>
            </select>


            <button v-on:click="updateProduct">actualizar producto</button>
            <button v-on:click="resetProduct">Consultar otro producto</button>
        </div>
        
    </div>
</template>

<script>

    import axios from 'axios';

    export default {

        name: 'Categories',

        data: function (){
            return {
                product_id: "",
                name: "",
                description: "",
                quantity:"",
                precio_unitario:"",
                producto_found:false,
                name_mostrar:"",
                description_mostrar:"",
                id_mostrar:"",
                category:"",
                unit_measurement:""

            }
        },

        created: function() {

            this.username = this.$route.params.username
            let self = this
            this.allCategories = this.$route.params.allCategories
            this.units_mesusre =["Units", "Liters", "Grams"]

        },

        methods: {
            resetProduct: function() {
                this.username = this.$route.params.username
                let self = this
                self.producto_found = false
                localStorage.product_id = ""
                self.product_id = "",
                self.name = "",
                self.description = ""
                self.quantity="",
                self.precio_unitario=""
                self.description_mostrar = ""
                self.id_mostrar = ""
                self.name_mostrar = ""
                self.category=""
                
            },

            getProduct: function() {
                
                this.username = this.$route.params.username
                let self = this
                if (self.product_id == null || self.product_id == ""){
                    self.producto_found = false
                    self.resetProduct()
                    return
                }
                axios.post("http://localhost:5000/graphql", {
                    query: `
                        query productById($id:Int!){
                            productById(id: $id){
                                id
                                name
                                description
                                category {
                                name
                                id
                                }
                                unit_measurement
                                quantity
                                precio_unitario
                            }
                        }`,
                    variables:{
                        id:self.product_id
                    }

                })
                    .then((result) => {
                        if (result.data.data != null){
                            self.product_id = result.data.data.productById.id
                            self.name = result.data.data.productById.name,
                            self.description = result.data.data.productById.description
                            self.quantity = result.data.data.productById.quantity
                            self.precio_unitario = result.data.data.productById.precio_unitario
                            self.category = result.data.data.productById.category.id
                            self.unit_measurement = result.data.data.productById.unit_measurement

                            self.name_mostrar = result.data.data.productById.name,
                            self.description_mostrar = result.data.data.productById.description
                            self.producto_found = true
                            localStorage.product_id = result.data.data.productById.id
                            self.id_mostrar= result.data.data.productById.id
                        }else{
                            self.producto_found = false
                            localStorage.product_id = null
                            alert("No se encontro la categoria en la base de datos");
                        }
                        
                    })
                    .catch((error) => {
                        self.producto_found = false
                        localStorage.product_id = null
                        alert("ERROR de Servidor");
                    });
            }, 
            updateProduct: function() {
                
                this.username = this.$route.params.username
                let self = this
                if (self.product_id == null || self.product_id == ""){
                    self.producto_found = false
                    alert("No se encontro la categoria en la base de datos. Recomendación: no modifique el id de la categoria");
                    return
                }
                let product =  {
                    name:self.name,
                    description:self.description,
                    category:self.category,
                    unit_measurement:self.unit_measurement,
                    quantity:self.quantity,
                    precio_unitario:self.precio_unitario

                }
                axios.post("http://localhost:5000/graphql", {
                    query: `
                        mutation updateProduct($id:Int!, $product:ProductInput!){
                            updateProduct(id: $id, product:$product){
                                id
                                name
                                description
                                category {
                                    id
                                    name
                                }
                                unit_measurement
                                quantity
                                precio_unitario
                            }
                        }`,

                    variables:{
                        id:localStorage.product_id,
                        product:product
                    }

                })
                    .then((result) => {
                        if (result.data.data != null){
                            self.product_id = result.data.data.updateProduct.id
                            self.name = result.data.data.updateProduct.name,
                            self.description = result.data.data.updateProduct.description
                            self.quantity = result.data.data.updateProduct.quantity
                            self.precio_unitario = result.data.data.updateProduct.precio_unitario
                            self.category = result.data.data.updateProduct.category.id
                            self.unit_measurement = result.data.data.updateProduct.unit_measurement

                            self.name_mostrar = result.data.data.updateProduct.name,
                            self.description_mostrar = result.data.data.updateProduct.description
                            self.producto_found = true
                            localStorage.product_id = result.data.data.updateProduct.id
                            self.id_mostrar= result.data.data.updateProduct.id

                             alert("Se ha actualizado el producto con id: " + self.product_id + ". detalle: \n" +
                             "nombre: " + self.name + "\n" +
                             "descripcion: " + self.description + "\n"+ 
                             "cantidad: " + self.quantity + "\n"+
                             "Precio unitario: " + self.precio_unitario + "\n"+
                             "Categoria: " + result.data.data.updateProduct.category.name + "\n"+
                             "Unidad de medida: " +  self.unit_measurement);
                        }else{

                            self.producto_found = false
                            localStorage.category_id = null
                            alert("No se encontro la categoria en la base de datos");
                        }
                        
                    })
                    .catch((error) => {
                        self.producto_found = false
                        localStorage.category_id = null
                        alert("ERROR de Servidor");
                    });
            }, 
            
        }
    }
</script>

<style>
    #Prodcuts{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    #editar_producto{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    #Prodcuts h2{
        font-size: 16 px;
        color: #0a1016;
        margin-top: 2px;
        margin-bottom: 2px;
    }
    #Prodcuts h1{
        font-size: 16 px;
        color: #2e455e;
        margin-top: 2px;
        margin-bottom: 2px;
    }
    #Prodcuts span{
        color: crimson;
        font-weight: bold;
    }
    #Prodcuts label{
        font-size: 25 px;
        color: #0a1016;
    }
    #Prodcuts input{
        color: #0a1016;
        font-weight: bold;
    }
</style>