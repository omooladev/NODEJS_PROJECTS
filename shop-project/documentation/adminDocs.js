const addProductRoute = {
  tags: ["Admin"],
  description: "Add Products to the database",
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
