import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { ParamSchema } from "./inputs";
import { UserSchema } from "./outputs";
import { swaggerUI } from "@hono/swagger-ui";

const app = new OpenAPIHono();

const getUserRoute = createRoute({
  method: "get",
  path: "/user/{id}",
  request: {
    params: ParamSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UserSchema,
        },
      },
      description: "Get the user details",
    },
  },
});

const postUserRoute = createRoute({
  method: "post",
  path: "/user/{id}",
  request: {
    params: ParamSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UserSchema,
        },
      },
      description: "Get the user details",
    },
  },
});

app.openapi(getUserRoute, (c) => {
  const { id } = c.req.valid("param");
  return c.json({
    id,
    age: 12,
    name: "something something",
  });
});

app.openapi(postUserRoute, (c) => {
  const { id } = c.req.valid("param");
  return c.json({
    id,
    age: 12,
    name: "something something",
  });
});

app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "My HONO API",
  },
});

app.get(
  "/ui",
  swaggerUI({
    url: "/doc",
  })
);

export default app;
