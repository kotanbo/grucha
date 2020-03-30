import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  if (process.client) {
    window.onNuxtReady(() => {
      createPersistedState({
        paths: [
          'rooms.createdRoomIds',
          'rooms.bookmarkedRoomIds',
          'rooms.posts.createdPostIds'
        ]
      })(store)
    })
  }
}
