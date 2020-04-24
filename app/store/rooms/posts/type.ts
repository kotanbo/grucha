import { Room } from '../type'

export interface Post {
  id: string
  body: string
  createdBy: string
  createdAt: {}
}

export interface S {
  posts: Post[]
}

export interface G {
  posts: Post[]
  findIncludeBody: (body: string) => Post[]
}
export interface RG {
  'rooms/posts/posts': G['posts']
  'rooms/posts/findIncludeBody': G['findIncludeBody']
}

export interface A {
  asyncCreatePost: { room: Room; body: string }
  asyncEditPost: { room: Room; post: Post; body: string }
  asyncDeletePost: { room: Room; post: Post }
}
export interface RA {
  'rooms/posts/asyncCreatePost': A['asyncCreatePost']
  'rooms/posts/asyncEditPost': A['asyncEditPost']
  'rooms/posts/asyncDeletePost': A['asyncDeletePost']
}
