import { hash } from "bcrypt";
import { User } from "../models/user";

export async function initDatabase() {
  const userCount = await User.count();

  if (userCount === 0) {
    await creatAdmin();
  }

  console.log("Initialize user table.");
}

async function creatAdmin() {
  const password = await hash("admin", 12);
  const user = User.create({ email: "admin@program.com", password });
  await user.save();
}
