import User from '../model/user.js';

export const getUser = async (req, res, next) => {
  const user = await User.findOne();
  res.status(200).json({ user });
}

export const updateUserStatus = async (req, res, next) => {

  const { status } = req.body;
  //logged in user
  const user = await User.findOne();
  
  await user.updateStatus(status);
  res.status(200).json({ message: 'Status updated' });
}