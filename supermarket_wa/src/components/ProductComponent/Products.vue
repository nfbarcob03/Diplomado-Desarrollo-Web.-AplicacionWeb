<template>
    <div id="Categories">
        <h2>Seleccione una opcion</h2>
        <button v-on:click="productById('update')" >Buscar/editar producto por ID</button>
        <button v-on:click="allProducts">Ver todos los productos</button>
        <button v-on:click="productById('create')">Crear un producto</button>
    </div>
</template>

<script>
 import axios from 'axios';
    export default {
        name: "User",
        data:function(){
            return {
                username: "none"
            }
        },
        created: function() {
            this.username = this.$route.params.username
        },
           methods: {

      productById: function(estado){
        if(this.$route.name != "productById"){
            axios.post("http://localhost:5000/graphql", {
                    query: `
                        query allCategories{
                            allCategories{
                                id
                                name
                                description
                            }
                        }`,
                    variables:{
                    }

                })
                    .then((result) => {
                        console.log(result)
                        if (result.data.data != null){
                            let username = localStorage.getItem("current_username")
                            let allCategories = result.data.data.allCategories
                            if (estado =="update"){
                                this.$router.push({name: "productById", params:{ username: username, allCategories:allCategories }})
                            }else{
                                this.$router.push({name: "createProduct", params:{ username: username, allCategories:allCategories }})
                            }
                                
                        }else{
                            self.category_found = false
                            localStorage.category_id = null
                            alert("No se encontro la categoria en la base de datos");
                        }
                        
                    })
                    .catch((error) => {
                        self.category_found = false
                        localStorage.category_id = null
                        alert("ERROR de Servidor");
                    });


          
        }
      },
      createProduct: function(){
        if(this.$route.name != "createProduct"){
          let username = localStorage.getItem("current_username")
          this.$router.push({name: "createProduct", params:{ username: username }})
        }
      },

      allProducts: function(){
        if(this.$route.name != "allProducts"){
            this.username = this.$route.params.username
                let self = this
                axios.post("http://localhost:5000/graphql", {
                    query: `
                        query allProducts{
                            allProducts{
                                id
                                name
                                description
                                quantity
                                unit_measurement
                                precio_unitario
                                category {
                                    id
                                    name
                                }
                            }
                        }`,
                    variables:{
                    }

                })
                    .then((result) => {
                        console.log(result)
                        if (result.data.data != null){
                            let username = localStorage.getItem("current_username")
                            let allProducts = result.data.data.allProducts
                            this.$router.push({name: "allProducts", params:{ username: username, allProducts:allProducts }})
                            
                        }else{
                            self.category_found = false
                            localStorage.category_id = null
                            alert("No se encontro la categoria en la base de datos");
                        }
                        
                    })
                    .catch((error) => {
                        self.category_found = false
                        localStorage.category_id = null
                        alert("ERROR de Servidor");
                    });
        }
      },

    },
    }
</script>

<style>
    #Categories{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    #Categories h2{
        font-size: 50px;
        color: #283747;
    }
    #Categories span{
        color: crimson;
        font-weight: bold;
    }
    button{
    color: #E5E7E9;
    background: #283747;
    border: 1px solid #E5E7E9;
    border-radius: 5px;
    padding: 10px 20px;
  }
  button:hover{
    color: #283747;
    background: #E5E7E9;
    border: 1px solid #E5E7E9;
  }
</style>