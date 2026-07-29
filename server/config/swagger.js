const swaggerJsdoc = require("swagger-jsdoc");

const options = {
definition: {
    openapi: "3.0.0",
    info: {
    title: "ResumeCraft AI API",
    version: "1.0.0",
    description: "REST API documentation for ResumeCraft AI",
    },
    servers: [
    {
        url: "http://localhost:5000",
    },
    ],
    components: {
    securitySchemes: {
        bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        },
    },
    },
},
apis: ["./routes/*.js"],
};

module.exports = swaggerJsdoc(options);