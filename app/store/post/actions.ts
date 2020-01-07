import { ActionTree } from 'vuex'
import { PostsState, RootState, Post } from '~/store/types'

const actions : ActionTree<PostsState, RootState> = {
  fetchPosts: async ({ commit, state }, { body }) => {
    alert(body)
  }
}

export default actions
