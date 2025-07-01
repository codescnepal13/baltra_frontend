// src/mocks/handlers.js
import { rest } from "msw";

export const handlers = [
  // Successful login
  rest.post("http://192.168.1.93:8000/api/customer/login", (req, res, ctx) => {
    return res(ctx.json({ token: "mockToken" }), ctx.status(200));
  }),

  // Failed login
  rest.post("http://192.168.1.93:8000/api/customer/login", (req, res, ctx) => {
    return res(ctx.status(401));
  }),
];
