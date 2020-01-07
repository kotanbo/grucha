export interface RootState {}

export interface PostsState {
  posts: Post[]
}

export interface Post {
  id: string
  from: string
  body: string
  tag: string
  createdAt: Date
}
