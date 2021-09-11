<template>
  <div id="allCategories">
    <table>
      <tr>
        <th>Id</th>
        <th>Nombre categoria</th>
        <th>Descripcion categoria</th>
      </tr>

      <tr v-for="category in allCategories" :key="category.id">
        <td>{{ category.id }}</td>
        <td>{{ category.name }}</td>
        <td>{{ category.description }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
 import axios from 'axios';

    export default {

        name: 'Categories',

        data: function (){
            return {
                username: "none",
                AllCategories: [],

            }
        },

        created: function() {
            let self = this
            this.username = this.$route.params.username
            this.allCategories = this.$route.params.allCategories
        },

        methods: {
            getAllCategories: function() {
                
                this.username = this.$route.params.username
                let self = this
                
                axios.post("http://localhost:5000/graphql", {
                    query: `
                        query allCategories{
                            categoryById(id: $id){
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
                            self.AllCategories = result.data.data
                            
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

};
</script>


<style>
#allCategories {
  width: 100%;
  height: 120%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

#allCategories table {
  width: 50%;
  border-collapse: collapse;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 20px;
}

#allCategories table td,
#allCategories table th {
  border: 1px solid #ddd;
  padding: 8px;
}

#allCategories table tr:nth-child(even) {
  background-color: #f2f2f2;
}

#allCategories table tr:hover {
  background-color: #ddd;
}

#allCategories table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: crimson;
  color: white;
}
</style>