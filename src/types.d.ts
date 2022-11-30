export interface PostResponse {
  [id: string]: Post;
}

export interface Post {
  content: string;
  date: string;
}

export interface PostWithId extends Post{
  id: string;
}
