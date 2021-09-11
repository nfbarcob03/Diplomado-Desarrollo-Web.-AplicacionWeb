export const productTypeDef = `
  type CategoryProduct {
    id: Int!
    name: String
    description: String
  }
  type Product {
      id: Int!
      name: String
      description: String
      category: CategoryProduct
      unit_measurement: String
      quantity:Int!
      precio_unitario:Float!
  }
  input ProductInput {
     name: String!
     description: String!
     category: Int!
     unit_measurement: String!
     quantity: Int!
     precio_unitario:Float!
  }`;

export const productQueries = `
      allProducts: [Product]!
      productById(id: Int!): Product!
  `;

export const productMutations = `
    createProduct(product: ProductInput!): Product!
    updateProduct(id: Int!, product: ProductInput!): Product!
    deleteProduct(id: Int!): Int
`;
