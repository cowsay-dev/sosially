export interface PostDataInterface {
  createdAt: number;
  id: string;
  likedBy: string[];
  imgUrl: string;
  text: string;
  uid: string;
}

export interface CommentDataInterface {
  id: string;
  pid: string;
  uid: string;
  text: string;
}

export interface UserDataInterface {
  email: string;
  userId: string;
  username: string;
  id: string;
  avatar: string;
}

export interface ConnectionDataInterface {
  uid: string;
  connections: string[];
  id: string;
}
