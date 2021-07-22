import bcrypt from 'bcrypt';

const users = [
   {
      name: 'Admin User',
      email: 'admin@abc.com',
      password: bcrypt.hashSync('12345678', 10),
      role: 'admin',
   },
   {
      name: 'User',
      email: 'user1@abc.com',
      password: bcrypt.hashSync('12345678', 10),
   },
   {
      name: 'User2',
      email: 'user2n@abc.com',
      password: bcrypt.hashSync('12345678', 10),
   },
   {
      name: 'User3',
      email: 'user3@abc.com',
      password: bcrypt.hashSync('12345678', 10),
   },
];
export default users;
