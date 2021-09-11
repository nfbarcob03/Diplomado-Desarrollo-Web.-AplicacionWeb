
<template>
    <div id="editar_categoria" v-if="username != null && username !=''">
            <h2 > Crear categoria </h2>
            <label for="text"> Ingrese el nombre de la categoria</label>
            <input type="name" id ="name" name = "name" v-model="name" placeholder="Nombre">
            <label for="description"> Ingrese la description de la categoria</label>
            <input type="text" id ="description" name = "description" v-model="description" placeholder="description">
            <button v-on:click="createCategory">Crear categoria</button>
    </div>
</template>

<script>

    import axios from 'axios';

    export default {

        name: 'Categories',

        data: function (){
            return {
                category_id: "",
                name: "",
                description: "",
                category_found:false,
                name_mostrar:"",
                description_mostrar:"",
                category_id_mostrar:""

            }
        },

        created: function() {

            this.username = this.$route.params.username
            let self = this

        },

        methods: {
            resetCategory: function() {
                this.username = this.$route.params.username
                let self = this
                localStorage.category_id = ""
                self.category_id = "",
                self.name = "",
                self.description = ""
                
            },

            createCategory: function() {
                
                this.username = this.$route.params.username
                let self = this
                axios.post("http://localhost:5000/graphql", {
                    query: `
                        mutation createCategory($category:CategoryInput!){
                            createCategory(category: $category){
                                id
                                name
                                description
                            }
                        }`,
                    variables:{
                        category:{
                            name:self.name,
                            description:self.description
                        }
                    }

                })
                    .then((result) => {
                        if (result.data.data != null && result.data.data != ""){
                            self.category_id = result.data.data.createCategory.id
                            self.name = result.data.data.createCategory.name,
                            self.description = result.data.data.createCategory.description
                            //localStorage.category_id = result.data.data.categoryById.id
                            //console.log(localStorage.category_id)
                            alert("Se ha creado correctamente la categoria " + self.name + " con ID "
                            + self.category_id + " y la siguiente descripcion : \n" +
                            self.description)
                            self.resetCategory()
                            
                        }else{
                            self.category_found = false
                            localStorage.category_id = null
                            alert("No se pudo crear la categoria, intentelo mas tarde");
                        }
                        
                    })
                    .catch((error) => {
                        console.log(error)
                        self.category_found = false
                        localStorage.category_id = null
                        alert("ERROR de Servidor");
                    });
            }, 
             
            
        }
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
    #editar_categoria{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    #Categories h2{
        font-size: 16 px;
        color: #0a1016;
        margin-top: 2px;
        margin-bottom: 2px;
    }
    #Categories h1{
        font-size: 16 px;
        color: #2e455e;
        margin-top: 2px;
        margin-bottom: 2px;
    }
    #Categories span{
        color: crimson;
        font-weight: bold;
    }
    #Categories label{
        font-size: 25 px;
        color: #0a1016;
    }
    #Categories input{
        color: #0a1016;
        font-weight: bold;
    }
</style>