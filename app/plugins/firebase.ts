import * as firebase from 'firebase/app'
import 'firebase/firestore'

declare module 'vue/types/vue' {
  interface Vue {
    $firebase: firebase.app.App
    $firestore: firebase.firestore.Firestore
  }
}
declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $firebase: firebase.app.App
    $firestore: firebase.firestore.Firestore
  }
}
declare module 'vuex/types/index' {
  interface Store<S> {
    $firebase: firebase.app.App
    $firestore: firebase.firestore.Firestore
  }
}

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
  })
}

export default (context: any, inject: any) => {
  inject('firebase', firebase)
  inject('firestore', firebase.firestore())
}
