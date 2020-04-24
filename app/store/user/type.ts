export interface User {
  uid: string
}

export interface S {
  user: User
}

export interface G {
  user: User
}
export interface RG {
  'user/user': G['user']
}

export interface M {
  setUser: { uid: string }
}
export interface RM {
  'user/setUser': M['setUser']
}

export interface A {
  setAnonymousUser: {}
}
export interface RA {
  'user/setAnonymousUser': A['setAnonymousUser']
}
