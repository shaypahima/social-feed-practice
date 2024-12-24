import { getLoggedInUser } from "../db/dummy.js";


export const getUser = (req, res, next) => {
  res.status(200).json({ user: getLoggedInUser() });
}