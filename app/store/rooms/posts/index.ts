import { firestoreAction } from 'vuexfire'
import { Getters, Mutations, Actions } from 'vuex'
import { Post, S, G, M, A } from './type'

export const state = (): S => ({
  posts: [],
  createdPostIds: [] // vuex-persistedstate の対象
})

export const getters: Getters<S, G> = {
  posts(state) {
    return state.posts
  },
  createdPostIds(state) {
    return state.createdPostIds
  },
  findIncludeBody(state) {
    return (body) => {
      return state.posts.filter((v) => v.body.includes(body))
    }
  }
}
export const mutations: Mutations<S, M> = {
  addCreatedPostIds(state, payload) {
    state.createdPostIds.push(payload.post.id)
  }
}

export const actions: Actions<S, A, G, M> | {} = {
  async asyncCreatePost(ctx, payload) {
    const now = new Date()
    const post: Post = {
      id: '',
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
      .then((docRef) => {
        post.id = docRef.id
        ctx.commit('addCreatedPostIds', { post })
      })
  },
  async asyncEditPost(ctx, payload) {
    await this.$firestore
      .collection('rooms')
      .doc(payload.room.id)
      .collection('posts')
      .doc(payload.post.id)
      .update({
        body: payload.body
      })
  },
  async asyncDeletePost(ctx, payload) {
    await this.$firestore
      .collection('rooms')
      .doc(payload.room.id)
      .collection('posts')
      .doc(payload.post.id)
      .delete()
  },
  setPostsRef: firestoreAction(({ bindFirestoreRef }, { ref }) => {
    bindFirestoreRef('posts', ref)
  })
}
