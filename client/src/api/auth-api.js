import * as request from "./requester";
import { AUTH_URL } from "./urls/urls";

export const login = (email, password) =>
  request.post(`${AUTH_URL}/login`, { email, password });

export const register = (email, password) =>
  request.post(`${AUTH_URL}/register`, { email, password });
