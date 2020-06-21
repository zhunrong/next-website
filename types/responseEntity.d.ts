interface Data<T = any> {
  status: 'success' | 'error';
  data: T;
  message: string;
  meta?: {
    page: number;
    pageSize: number;
    total: number;
    pageCount: number;
  };
}

interface DraftEntity {
  id: string;
  html: string;
  raw: string;
  title: string;
  createTime: string;
  updateTime: string;
  updateAt: string;
  sync: number;
}

interface BlogEntity {
  id: string;
  uid: string;
  title: string;
  html: string;
  raw: string;
  avatar: string;
  draftId: string;
  updateTime: string;
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

/**
 * 上传令牌
 */
interface UploadTokenEntity {
  credentials: {
    sessionToken: string;
    tmpSecretId: string;
    tmpSecretKey: string;
  };
  expiredTime: number;
  startTime: number;
  bucket: string;
  region: string;
  directory?: string;
  domain: string;
}
