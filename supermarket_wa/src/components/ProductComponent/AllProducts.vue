<template>
  <div id="allCategories">
    <table>
      <tr>
        <th>Id</th>
        <th>Nombre producto</th>
        <th>Descripcion producto</th>
        <th>Cantidad producto</th>
        <th>Categoria producto</th>
        <th>Unidad de medida</th>
        <th>Precio unitario</th>
      </tr>

      <tr v-for="product in allProducts" :key="product.id">
        <td>{{ product.id }}</td>
        <td>{{ product.name }}</td>
        <td>{{ product.description }}</td>
        <td>{{ product.quantity }}</td>
        <td v-if="!isCompraDetalle">{{ product.category.name }}</td>
        <td v-if="isCompraDetalle">{{ product.category }}</td>
        <td>{{ product.unit_measurement }}</td>
        <td>{{ product.precio_unitario }}</td>
      </tr>
    </table>
    <button v-on:click="goBack" v-if="isCompraDetalle">Atras</button>
  </div>
</template>

<script>
 import axios from 'axios';

    export default {

        name: 'Categories',

        data: function (){
            return {
                username: "none",
                allProducts: [],

            }
        },

        created: function() {
            let self = this
            this.username = this.$route.params.username
            this.allProducts = this.$route.params.allProducts
            this.isCompraDetalle =  this.$route.params.isCompraDetalle
            this.allCompras  =  this.$route.params.allCompras
        },

        methods: {
            goBack : function(){
              this.$router.push({name: "allCompras", params:{ username: this.username, allCompras:this.allCompras }})
            }
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