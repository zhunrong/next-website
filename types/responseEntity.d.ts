interface Data<T = any> {
  status: 'success' | 'error';
  data: T;
  message: string;
}

interface DraftEntity {
  id: string;
  html: string;
  raw: string;
  title: string;
  createAt: string;
  updateAt: string;
}

interface UserEntity {
  avatar: string;
  email: string;
  nickname: string;
  password: string;
  role: number;
  id: string;
  createAt: string;
  updateAt: string;
}
