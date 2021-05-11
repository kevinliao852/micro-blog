import { Response, Request } from 'express';
import { User } from '../models/user';
import { hash } from 'bcrypt';

interface userCreateData {
  email: string;
  password: string;
}

export const create = async (
  req: Request<{}, {}, userCreateData>,
  res: Response
) => {
  const { email, password }: userCreateData = req.body;

  try {
    await User.insert({
      email,
      password: await hash(password, 12),
    });
  } catch (err) {
    console.log(err);
  }
  res.send({ status: 'ok' });
};
export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await User.getRepository().delete(id);
  const { affected } = result;
  console.log(result);
  res.send({
    isDeleted:
      affected && typeof affected === 'number' && affected > 0 ? true : false,
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
