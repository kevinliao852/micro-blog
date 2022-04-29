import { Response, Request } from "express";
import { User } from "../models/user";
import { hash } from "bcrypt";
import { generateAccessToken } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
  const { email, password }: User = req.body;

  await User.insert({
    email,
    password: await hash(password, 12),
  });

  res.send({ status: "ok" });
};

export const login = async (req: Request, res: Response) => {
  const { email }: User = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(401).send("Login failed.");
  }

  const jwt = generateAccessToken({ email });
  const response = { jwt };

  return res.status(200).send(response);
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await User.getRepository().delete(id);
  const { affected } = result;
  console.log(result);
  res.send({
    isDeleted:
      affected && typeof affected === "number" && affected > 0 ? true : false,
  });
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.getRepository().findOne(id);
  if (user) {
    User.getRepository().merge(user, req.body);
    const result = await User.getRepository().save(user);
    res.send(result);
  }
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.getRepository().find();
  res.send(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  const user = await User.getRepository().findOne(id);
  res.send(user);
};
