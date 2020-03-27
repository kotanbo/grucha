export interface App {
  title: string
}

export interface S {
  app: App
}

export interface G {
  settings: App
}
export interface RG {
  'app/settings': G['settings']
}

export interface M {
  setTitle: { title: string }
}
export interface RM {
  'app/setTitle': M['setTitle']
}

export interface A {
  setTitle: { title: string }
}
export interface RA {
  'app/setTitle': A['setTitle']
}
