const addProductRoute = {
  tags: ["Admin"],
  description: "Add Products to the database",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            Name: {
              type: "string",
              description: "Please provide product name",
              example: "Product name",
            },
            Price: {
              type: "number",
              description: "Please provide product price",
              example: 5000,
            },
            Description: {
              type: "string",
              description: "Please provide product description",
              example: "This is the product description",
            },
            Image: {
              content: {
                file: {
                  type: "string",
                  format: "binary",
                },
              },
            },
          },
        },
      },
    },
  },
  responses: {
    201: {
      description: "CREATED",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              Name: "Iphone 13",
              Price: "20000",
              description: "This is the best phone in the universe",
              image: "",
            },
          },
        },
      },
    },
    400: {
      description: "BAD REQUEST",
    },
  },
};

const adminDocs = {
  "/admin/add-product": {
    post: addProductRoute,
  },
};

module.exports = adminDocs;
