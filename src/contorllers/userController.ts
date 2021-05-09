import { Response, Request } from 'express';
import { User } from '../models/user';

export const create = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    await User.insert({
      email,
      password,
    });
  } catch (err) {
    console.log(err);
  }
  res.send({ status: 'ok' });
};
export const remove = (req: Request, res: Response) => {};
export const update = (req: Request, res: Response) => {};
export const getUsers = async (req: Request, res: Response) => {
  res.send(
    (await User.getRepository().createQueryBuilder('user').getRawAndEntities())
      .raw
  );
};
export const getUserById = (req: Request, res: Response) => {};
