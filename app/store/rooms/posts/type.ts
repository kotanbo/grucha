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
}
export interface RG {
  'rooms/posts/posts': G['posts']
}

export interface M {}
export interface RM {}

export interface A {
  createPost: {
    room: Room
    body: string
  }
}
export interface RA {
  'rooms/posts/createPost': A['createPost']
}
