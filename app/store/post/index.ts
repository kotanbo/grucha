import { Module } from 'vuex'
import { PostsState, RootState } from '~/store/types'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const state: PostsState = {
  posts: [],
}

export const posts: Module<PostsState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
