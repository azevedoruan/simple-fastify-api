import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import { errorHandler } from "./errors/error-handler.js";
import { registerRoute } from "./routes/register-routes.js";
import { loginRoute } from "./routes/login-route.js";
import { env } from "./config/env.js";

// Zod and Error
const app = fastify().withTypeProvider<ZodTypeProvider>();
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.setErrorHandler(errorHandler);

// Cors and Swagger
app.register(fastifyCors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
});

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'Simple Fastify API',
            version: '1.0.0'
        }
    },
    transform: jsonSchemaTransform
});

app.register(fastifySwaggerUi, {
    routePrefix: '/docs'
});

// Auth routes
app.register(registerRoute);
app.register(loginRoute);

// Entry point
app.listen({
    port: env.PORT,
    host: '0.0.0.0'
}).then(() => {
    console.log("Server is running on port " + env.PORT)
});