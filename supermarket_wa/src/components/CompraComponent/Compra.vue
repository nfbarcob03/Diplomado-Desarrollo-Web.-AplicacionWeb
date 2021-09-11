<template>
    <div id="Categories">
        <h2>Seleccione una opcion</h2>
        <button v-on:click="compraById" >Buscar/editar compra por ID</button>
        <button v-on:click="allCompras">Ver todas las compras</button>
        <button v-on:click="createCompra">Crear una compra</button>
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

      categoryById: function(){
        if(this.$route.name != "categoryById"){
          let username = localStorage.getItem("current_username")
          this.$router.push({name: "categoriesById", params:{ username: username }})
        }
      },
      createCategory: function(){
        if(this.$route.name != "createCategory"){
          let username = localStorage.getItem("current_username")
          this.$router.push({name: "createCategory", params:{ username: username }})
        }
      },

      allCompras: function(){
        if(this.$route.name != "allCompras"){
            this.username = this.$route.params.username
                let self = this
                axios.post("http://localhost:5000/graphql", {
                    query: `
                        query allCompras{
                            allCompras{
                                id
                                usuarioName
                                usuarioId
                                subtotal
                                total
                                marcaTiempo
                                productos{
                                    id
                                    name
                                    description
                                    category
                                    unit_measurement
                                    quantity
                                    precio_unitario
                                }
                            }
                        }`,
                    variables:{
                    }

                })
                    .then((result) => {
                        
                        if (result.data.data != null){
                            let username = localStorage.getItem("current_username")
                            let allCompras = result.data.data.allCompras
                            this.$router.push({name: "allCompras", params:{ username: username, allCompras:allCompras }})
                            
                        }else{
                            self.category_found = false
                            let allCompras = []
                            alert("No hay compras que mostrar");
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