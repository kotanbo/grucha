import { Room } from '../type'

export interface Post {
  body: string
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

export interface M {}
export interface RM {}

export interface A {
  asyncCreatePost: {
    room: Room
    body: string
  }
}
export interface RA {
  'rooms/posts/asyncCreatePost': A['asyncCreatePost']
}