import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Campus Facility Management API",
      version: "1.0.0",
      description: "API documentation for Campus Facility Management backend",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
            email: { type: "string" },
            role: { type: "string" },
          },
        },
        Issue: {
          type: "object",
          properties: {
            _id: { type: "string" },
            title: { type: "string" },
            description: { type: "string" },
            status: { type: "string" },
          },
        },
        Notification: {
          type: "object",
          properties: {
            _id: { type: "string" },
            message: { type: "string" },
            read: { type: "boolean" },
          },
        },
        Comment: {
          type: "object",
          properties: {
            _id: { type: "string" },
            text: { type: "string" },
            author: { $ref: "#/components/schemas/User" },
          },
        },
      },
    },
  },
  // No need to scan files for JSDoc; spec is defined inline
  apis: [],
};

export const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
