interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  photo?: string;
  isFreelancer?: boolean;
  skills?: string[];
}

export default User;