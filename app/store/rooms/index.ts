import { Getters, Mutations, Actions } from 'vuex'
import cloneDeep from 'lodash.clonedeep'
import { Room, S, G, M, A } from './type'

export const state = (): S => ({
  rooms: [],
  selectedRoom: null
})

export const getters: Getters<S, G> = {
  rooms(state) {
    return state.rooms
  },
  selectedRoom(state) {
    return state.selectedRoom
  },
  selectedRoomComments(state) {
    return state.selectedRoom?.comments
  }
}

export const mutations: Mutations<S, M> = {
  clearRooms(state, payload) {
    state.rooms.length = 0
  },
  addRoom(state, payload) {
    state.rooms.push(payload.room)
  },
  unshiftRoom(state, payload) {
    if (state.rooms.find((room) => room.id === payload.room.id)) {
      return
    }
    state.rooms = [payload.room, ...state.rooms]
  },
  setRoom(state, payload) {
    const index = state.rooms.findIndex((room) => room.id === payload.room.id)
    if (index >= 0) {
      state.rooms.splice(index, 1, payload.room)
    }
    if (state.selectedRoom?.id === payload.room.id) {
      state.selectedRoom = payload.room
    }
  },
  selectRoom(state, payload) {
    state.selectedRoom = payload.room
  }
}

export const actions: Actions<S, A, G, M> = {
  async fetchRooms(ctx, payload) {
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
        createdAt: data.createdAt
      }
      ctx.commit('addRoom', { room })
    })

    return ctx.state.rooms
  },
  selectRoom(ctx, payload) {
    if (payload.room && payload.room.id) {
      const ref = this.$firestore
        .collection('rooms')
        .doc(payload.room.id)
        .collection('posts')
      this.dispatch('rooms/posts/setPostsRef', { ref })
    }
    ctx.commit('selectRoom', { room: payload.room })
  },
  async createRoom(ctx, payload) {
    const now = new Date()
    const room: Room = {
      id: null,
      name: payload.name,
      createdAt: now,
      comments: []
    }
    await this.$firestore
      .collection('rooms')
      .add({
        name: room.name,
        createdAt: room.createdAt,
        comments: room.comments
      })
      .then((docRef) => {
        room.id = docRef.id
      })
    ctx.commit('unshiftRoom', { room })
  },
  async addRoomComment(ctx, payload) {
    if (!payload.room || !payload.room.id) {
      return
    }
    const comments = [...payload.room.comments, payload.comment]
    const room = cloneDeep<Room>(payload.room)
    if (!room.id) {
      return
    }
    await this.$firestore
      .collection('rooms')
      .doc(room.id)
      .update({
        comments
      })
      .then((docRef) => {
        room.comments = comments
      })
    ctx.commit('setRoom', { room })
  }
}
