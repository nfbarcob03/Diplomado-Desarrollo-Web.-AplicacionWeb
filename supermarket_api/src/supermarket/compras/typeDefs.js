export const compraTypeDef = `
  type ProductoCompra{
      id:Int!
      name:String!
      description: String
      category: Int
      unit_measurement: String
      quantity:Int
      precio_unitario:Float
  }
  input ProductoCompraInput{
    id:Int!
    quantity:Float!
    name:String
}
  type Compra {
      id: Int!
      usuarioName: String!
      usuarioId: Int!
      subtotal: Float!
      total: Float!
      marcaTiempo: String!
      productos:[ProductoCompra]!
      
  }
  input CompraInput {
        usuarioName: String!
        usuarioId: Int!
        productos:[ProductoCompraInput]!
  }`;

export const compraQueries = `
      allCompras: [Compra]!
      compraById(id: Int!): Compra!
  `;

export const compraMutations = `
    createCompra(compra: CompraInput!): Compra!
    updateCompra(id: Int!, compra: CompraInput!): Compra!
    deleteCompra(id: Int!): Int
`;
