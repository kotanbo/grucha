import { Getters, Mutations, Actions } from 'vuex'
import cloneDeep from 'lodash.clonedeep'
import { Room, S, G, M, A } from './type'

export const state = (): S => ({
  rooms: [],
  selectedRoom: undefined,
  bookmarkedRoomIds: [] // vuex-persistedstate の対象
})

export const getters: Getters<S, G> = {
  isRooms(state) {
    return state.rooms.length > 0
  },
  isSelectedRoom(state) {
    return !!state.selectedRoom
  },
  canUpdateRoom(state, getters, rootState, rootGetters) {
    return !!(
      state.selectedRoom &&
      state.selectedRoom.createdBy === rootGetters['user/user'].uid
    )
  },
  rooms(state) {
    const bookmarkedRooms = state.rooms.filter((v) => v.bookmarked)
    const notBookmarkedRooms = state.rooms.filter((v) => !v.bookmarked)
    return [...bookmarkedRooms, ...notBookmarkedRooms]
  },
  selectedRoom(state) {
    return state.rooms.find((v) => v.id === state.selectedRoom?.id)
  },
  selectedRoomComments(state) {
    return state.selectedRoom?.comments || []
  },
  findIncludeName(state) {
    return (name) => {
      return state.rooms.filter((v) => v.name.includes(name))
    }
  },
  getRoom(state) {
    return (id) => {
      return state.rooms.find((v) => v.id === id)
    }
  }
}

export const mutations: Mutations<S, M> = {
  clearRooms(state) {
    state.rooms.length = 0
  },
  addRoom(state, payload) {
    state.rooms.push(payload.room)
  },
  prependRoom(state, payload) {
    if (state.rooms.find((v) => v.id === payload.room.id)) {
      return
    }
    state.rooms = [payload.room, ...state.rooms]
  },
  deleteRoom(state, payload) {
    const index = state.rooms.findIndex((v) => v.id === payload.room.id)
    if (index >= 0) {
      state.rooms.splice(index, 1)
    }
    if (state.selectedRoom?.id === payload.room.id) {
      state.selectedRoom = undefined
    }
  },
  setRoom(state, payload) {
    const index = state.rooms.findIndex((v) => v.id === payload.room.id)
    if (index >= 0) {
      state.rooms.splice(index, 1, payload.room)
    }
    if (state.selectedRoom?.id === payload.room.id) {
      state.selectedRoom = payload.room
    }
  },
  selectRoom(state, payload) {
    state.selectedRoom = payload.room
  },
  bookmarkRoom(state, payload) {
    const room = state.rooms.find((v) => v.id === payload.room.id)
    if (!room) {
      return
    }
    const index = state.bookmarkedRoomIds.findIndex(
      (v) => v === payload.room.id
    )
    if (index >= 0 && room.bookmarked) {
      state.bookmarkedRoomIds.splice(index, 1)
    } else {
      state.bookmarkedRoomIds.push(room.id)
    }
    room.bookmarked = !room.bookmarked
  },
  setBookmarkRoomFromBookmarkedRoomIds(state) {
    state.rooms.map((v) => {
      v.bookmarked = !!(v.id && state.bookmarkedRoomIds.includes(v.id))
    })
  }
}

export const actions: Actions<S, A, G, M> = {
  async asyncFetchRooms(ctx) {
    const roomsSnapshot = await this.$firestore
      .collection('rooms')
      .orderBy('createdAt', 'desc')
      .get()
    ctx.commit('clearRooms')
    roomsSnapshot.forEach((roomSnapshot) => {
      const data = roomSnapshot.data()
      const room: Room = {
        id: roomSnapshot.id,
        name: data.name,
        comments: data.comments,
        createdBy: data.createdBy,
        createdAt: data.createdAt,
        bookmarked: false
      }
      ctx.commit('addRoom', { room })
    })
    ctx.commit('setBookmarkRoomFromBookmarkedRoomIds')
  },
  async asyncCreateRoom(ctx, payload) {
    const now = new Date()
    const room: Room = {
      id: '',
      name: payload.name,
      comments: [],
      createdBy: ctx.rootGetters['user/user'].uid,
      createdAt: now,
      bookmarked: false
    }
    await this.$firestore
      .collection('rooms')
      .add({
        name: room.name,
        createdBy: room.createdBy,
        createdAt: room.createdAt,
        comments: room.comments
      })
      .then((docRef) => {
        room.id = docRef.id
        ctx.commit('prependRoom', { room })
      })
  },
  async asyncEditRoom(ctx, payload) {
    const name = payload.name
    const room = cloneDeep<Room>(payload.room)
    await this.$firestore
      .collection('rooms')
      .doc(room.id)
      .update({
        name
      })
      .then(() => {
        room.name = name
        ctx.commit('setRoom', { room })
      })
  },
  async asyncDeleteRoom(ctx, payload) {
    const room = payload.room
    await this.$firestore
      .collection('rooms')
      .doc(room.id)
      .delete()
      .then(() => {
        ctx.commit('deleteRoom', { room })
      })
  },
  selectRoom(ctx, payload) {
    const ref = this.$firestore
      .collection('rooms')
      .doc(payload.room.id)
      .collection('posts')
      .orderBy('createdAt', 'desc')
    this.dispatch('rooms/posts/setPostsRef', { ref })
    ctx.commit('selectRoom', { room: payload.room })
  },
  bookmarkRoom(ctx, payload) {
    ctx.commit('bookmarkRoom', { room: payload.room })
  },
  async asyncAddRoomComment(ctx, payload) {
    const comments = [...payload.room.comments, payload.comment]
    const room = cloneDeep<Room>(payload.room)
    await this.$firestore
      .collection('rooms')
      .doc(room.id)
      .update({
        comments
      })
      .then(() => {
        room.comments = comments
        ctx.commit('setRoom', { room })
      })
  },
  async asyncEditRoomComment(ctx, payload) {
    const room = cloneDeep<Room>(payload.room)
    if (room.comments[payload.commentIndex]) {
      room.comments[payload.commentIndex] = payload.comment
    }
    await this.$firestore
      .collection('rooms')
      .doc(room.id)
      .update({
        comments: room.comments
      })
      .then(() => {
        ctx.commit('setRoom', { room })
      })
  },
  async asyncDeleteRoomComment(ctx, payload) {
    const room = cloneDeep<Room>(payload.room)
    room.comments.splice(payload.commentIndex, 1)
    await this.$firestore
      .collection('rooms')
      .doc(room.id)
      .update({
        comments: room.comments
      })
      .then(() => {
        ctx.commit('setRoom', { room })
      })
  }
}
