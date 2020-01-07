import { MutationTree } from 'vuex';
import { PostsState, Post } from '~/store/types'

const mutations: MutationTree<PostsState> = {
  add: (state, post: Post) => {
    state.posts.push(post)
  },
  remove: (state, id: string) => {
    state.posts = state.posts.filter((e: Post) => e.id !== id)
  },
}

export default mutations
