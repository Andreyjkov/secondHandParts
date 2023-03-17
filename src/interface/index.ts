export interface IFormAuth {
  email: string;
  password: string;
  name: string;
  phone: string;
}

export interface IUserData {
  email: string;
  name: string;
  phone: string;
  photoURL?: string
}

export interface IBaseData {
  docId: string
  brand: string;
  description: string
  model: string
  name: string
  parts: string
  phone: string
  userOwn: string
}