
<template>
    <div id="editar_producto">
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
                <option  v-for="category in allCategories" :value="category.id">{{category.name}}</option>
            </select>
            <label for="unit_messu"> Seleccione la unidad de medida del producto</label>
             <select  class="form-control" id="unit_measurement" v-model="unit_measurement">
                <option  v-for="messure in units_mesusre" :value="messure">{{messure}}</option>
            </select>


            <button v-on:click="createProduct">createProducto</button>
            <button v-on:click="resetProduct">borrar campos</button>
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

            createProduct: function() {
                
                this.username = this.$route.params.username
                let self = this
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
                        mutation createProduct($product:ProductInput!){
                            createProduct(product:$product){
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
                        product:product
                    }

                })
                    .then((result) => {
                        if (result.data.data != null){
                            self.product_id = result.data.data.createProduct.id
                            self.name = result.data.data.createProduct.name,
                            self.description = result.data.data.createProduct.description
                            self.quantity = result.data.data.createProduct.quantity
                            self.precio_unitario = result.data.data.createProduct.precio_unitario
                            self.category = result.data.data.createProduct.category.id
                            self.unit_measurement = result.data.data.createProduct.unit_measurement

                            self.name_mostrar = result.data.data.createProduct.name,
                            self.description_mostrar = result.data.data.createProduct.description
                            self.producto_found = true
                            localStorage.product_id = result.data.data.createProduct.id
                            self.id_mostrar= result.data.data.createProduct.id

                             alert("Se ha creado el producto con id: " + self.product_id + ". detalle: \n" +
                             "nombre: " + self.name + "\n" +
                             "descripcion: " + self.description + "\n"+ 
                             "cantidad: " + self.quantity + "\n"+
                             "Precio unitario: " + self.precio_unitario + "\n"+
                             "Categoria: " + result.data.data.createProduct.category.name + "\n"+
                             "Unidad de medida: " +  self.unit_measurement);
                             self.resetProduct()
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