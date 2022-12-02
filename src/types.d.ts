export interface PostResponse {
  [id: string]: Post;
}

export interface Post {
  content: string;
  date: string;
  title: string;
}

export interface PostWithId extends Post{
  id: string;
}
