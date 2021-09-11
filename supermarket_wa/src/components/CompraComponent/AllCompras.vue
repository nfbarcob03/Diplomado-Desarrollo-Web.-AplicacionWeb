<template>
  <div id="allCategories">
    <table>
      <tr>
        <th>Id</th>
        <th>usuarioName compra</th>
        <th>usuarioId compra</th>
        <th>subtotal compra</th>
        <th>total compra</th>
        <th>marcaTiempo compra</th>
        <th>Ver lista de productos</th>
        

      </tr>

      <tr v-for="compra in allCompras" :key="compra.id">
        <td>{{ compra.id }}</td>
        <td>{{ compra.usuarioName }}</td>
        <td>{{ compra.usuarioId }}</td>
        <td>{{ compra.subtotal }}</td>
        <td>{{ compra.total }}</td>
        <td>{{ compra.marcaTiempo }}</td>
        <td><button v-on:click="verProductos(compra.productos)">Ver detalle productos</button></td>

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

            }
        },

        created: function() {
            let self = this
            this.username = this.$route.params.username
            this.allCompras = this.$route.params.allCompras
        },

        methods: {
            
            verProductos: function(productos){
            if (productos != null && productos!=""){
              console.log(productos)
                let username = localStorage.getItem("current_username")
                localStorage.setItem('allCompras', this.allCompras)
                this.$router.push({name: "allProducts", params:{ username: username, allProducts:productos, isCompraDetalle:true, allCompras:this.allCompras }})
                
            }else{
                self.category_found = false
                productos = []
                alert("No hay productos que ver");
            }
            
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