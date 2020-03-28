import { firestoreAction } from 'vuexfire'
import { Getters, Actions } from 'vuex'
import { Post, S, G, M, A } from './type'

export const state = (): S => ({
  posts: []
})

export const getters: Getters<S, G> = {
  posts(state) {
    return state.posts
  }
}

export const actions: Actions<S, A, G, M> | {} = {
  async createPost(ctx, payload) {
    if (!payload.room || !payload.room.id) {
      return
    }
    const now = new Date()
    const post: Post = {
      body: payload.body,
      createdAt: now
    }
    await this.$firestore
      .collection('rooms')
      .doc(payload.room.id)
      .collection('posts')
      .add({
        body: post.body,
        createdAt: post.createdAt
      })
  },
  setPostsRef: firestoreAction(({ bindFirestoreRef }, { ref }) => {
    bindFirestoreRef('posts', ref)
  })
}
