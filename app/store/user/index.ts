import { Getters, Mutations, Actions } from 'vuex'
import { S, G, M, A } from './type'

export const state = (): S => ({
  user: {
    uid: ''
  }
})

export const getters: Getters<S, G> = {
  user(state) {
    return state.user
  }
}

export const mutations: Mutations<S, M> = {
  setUser(state, payload) {
    state.user.uid = payload.uid
  }
}

export const actions: Actions<S, A, G, M> = {
  setAnonymousUser(ctx) {
    this.$firebase
      .auth()
      .signInAnonymously()
      .catch((error) => {
        throw error
      })
    this.$firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        ctx.commit('setUser', { uid: user.uid })
      }
    })
  }
}
