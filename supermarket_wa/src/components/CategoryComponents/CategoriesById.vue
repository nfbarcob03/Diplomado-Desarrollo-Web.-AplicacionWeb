
<template>
    <div id="Categories">
        <h2>Usuario autenticado: <span>{{username}}</span></h2>
        <h1 v-if="category_found">La categoría con id = <span>{{category_id_mostrar}}</span>, tiene el nombre <span>{{name_mostrar}}</span> y su descripción es «<span>{{description_mostrar}}</span>».</h1>
        <label for="categoryId"> Ingrese el ID de la categoria</label>
        <input type="number" id ="categoryId" name = "categoryId" v-model="category_id" placeholder="categoria ID" :disabled="category_found">
        <button v-on:click="getCategory" v-if="!category_found">Obtener categoría</button>
        

        <div id="editar_categoria" v-if="category_found">
            <h2 > Editar categoria </h2>
            <label for="text"> Ingrese el nombre de la categoria</label>
            <input type="name" id ="name" name = "name" v-model="name" placeholder="Nombre">
            <label for="description"> Ingrese la description de la categoria</label>
            <input type="text" id ="description" name = "description" v-model="description" placeholder="description">
            <button v-on:click="updateCategory">actualizar categoría</button>
            <button v-on:click="resetCategory">Consultar otra categoria</button>
        </div>
        
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
                self.category_found = false
                localStorage.category_id = ""
                self.category_id = "",
                self.name = "",
                self.description = ""
                self.description_mostrar = ""
                self.category_id_mostrar = ""
                self.name_mostrar = ""
                
            },

            getCategory: function() {
                
                this.username = this.$route.params.username
                let self = this
                if (self.category_id == null || self.category_id == ""){
                    self.category_found = false
                    return
                }
                axios.post("http://localhost:5000/graphql", {
                    query: `
                        query categoryById($id:Int!){
                            categoryById(id: $id){
                                id
                                name
                                description
                            }
                        }`,
                    variables:{
                        id:self.category_id
                    }

                })
                    .then((result) => {
                        if (result.data.data != null){
                            self.category_id = result.data.data.categoryById.id
                            self.name = result.data.data.categoryById.name,
                            self.description = result.data.data.categoryById.description
                            self.name_mostrar = result.data.data.categoryById.name,
                            self.description_mostrar = result.data.data.categoryById.description
                            self.category_found = true
                            localStorage.category_id = result.data.data.categoryById.id
                            self.category_id_mostrar= result.data.data.categoryById.id
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
            }, 
            updateCategory: function() {
                
                this.username = this.$route.params.username
                let self = this
                if (self.category_id == null || self.category_id == ""){
                    self.category_found = false
                    alert("No se encontro la categoria en la base de datos. Recomendación: no modifique el id de la categoria");
                    return
                }
                let category =  {
                    name:self.name,
                    description:self.description
                }
                axios.post("http://localhost:5000/graphql", {
                    query: `
                        mutation updateCategory($id:Int!, $category:CategoryInput!){
                            updateCategory(id: $id, category:$category){
                                id
                                name
                                description
                            }
                        }`,

                    variables:{
                        id:localStorage.category_id,
                        category:category
                    }

                })
                    .then((result) => {
                        if (result.data.data != null){
                            self.category_id = result.data.data.updateCategory.id,
                            self.name = result.data.data.updateCategory.name,
                            self.description = result.data.data.updateCategory.description
                            localStorage.category_id = result.data.data.updateCategory.id
                            self.name_mostrar = result.data.data.updateCategory.name,
                            self.description_mostrar = result.data.data.updateCategory.description
                            self.category_found = true
                            self.category_id_mostrar= localStorage.category_id
                             alert("Se ha actualizado la categoria con id: " + self.category_id_mostrar + ". detalle: \n" +
                             "nombre: " + self.name + "\n" +
                             "descripcion: " + self.description + "\n");
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