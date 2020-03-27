import { Getters, Mutations, Actions } from 'vuex'
import { S, G, M, A } from './type'

export const state = (): S => ({
  app: {
    title: ''
  }
})

export const getters: Getters<S, G> = {
  settings(state) {
    return state.app
  }
}

export const mutations: Mutations<S, M> = {
  setTitle(state, payload) {
    state.app.title = payload.title
  }
}

export const actions: Actions<S, A, G, M> = {
  setTitle(ctx, payload) {
    ctx.commit('setTitle', { title: payload.title })
  }
}
