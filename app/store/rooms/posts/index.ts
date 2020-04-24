import { firestoreAction } from 'vuexfire'
import { Getters, Mutations, Actions } from 'vuex'
import { Post, S, G, A } from './type'

export const state = (): S => ({
  posts: []
})

export const getters: Getters<S, G> = {
  posts(state) {
    return state.posts
  },
  findIncludeBody(state) {
    return (body) => {
      return state.posts.filter((v) => v.body.includes(body))
    }
  }
}

export const actions: Actions<S, A, G> | {} = {
  async asyncCreatePost(ctx, payload) {
    const now = new Date()
    const post: Post = {
      id: '',
      body: payload.body,
      createdBy: ctx.rootGetters['user/user'].uid,
      createdAt: now
    }
    await this.$firestore
      .collection('rooms')
      .doc(payload.room.id)
      .collection('posts')
      .add({
        body: post.body,
        createdBy: post.createdBy,
        createdAt: post.createdAt
      })
      .then((docRef) => {
        post.id = docRef.id
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
