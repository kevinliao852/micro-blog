import jwt from "jsonwebtoken";

// jwt secret
// TODO: Remove this and place it into .env file
const JWTSECRET =
  "57a7226107e7ea09a03e197eedecc31cf16548b4cec848cd24f0f75531bae00bdfb00ebfbb6f3c8df71a14092a6e8556381b36adc5f337264d097089f268732e";

export function generateAccessToken(data: any) {
  return jwt.sign(data, JWTSECRET);
}
