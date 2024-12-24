
const USER = {
  id: 'e1',
  name: 'Shay Pahima',
  email: 'shphm4668@gmail.com',
  status: 'Here to be the best at fullstack!'
}


export const getUser = (req, res, next) => {
  res.status(200).json({ user: USER });
}

