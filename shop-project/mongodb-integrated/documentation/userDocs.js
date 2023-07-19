const getProductsRoute = {
  tags: ["User"],
  description: "Get all products",
  responses: {
    200: {
      description: "OK",
      content: {
        "text/html": {},
      },
    },
  },
};

const userDocs = {
  "/": {
    get: getProductsRoute,
  },
};

module.exports = userDocs;
