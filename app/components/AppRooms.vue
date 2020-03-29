<template>
  <div>
    <v-list>
      <v-list-item>
        <v-list-item-action>
          <v-btn icon color="secondary" @click="dialog = !dialog">
            <v-icon>mdi-folder-plus</v-icon>
          </v-btn>
        </v-list-item-action>
        <v-list-item-action>
          <v-btn icon color="success" @click="fetchRooms">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-text-field
            v-model="searchText"
            placeholder="ルーム検索"
          ></v-text-field>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item-group mandatory>
        <v-list-item
          v-for="(room, index) in rooms"
          :key="index"
          :to="`/rooms/${room.id}`"
        >
          <v-list-item-content>
            <v-list-item-title v-text="room.name" />
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click="bookmark(room)">
              <v-icon v-if="!room.bookmarked">mdi-bookmark</v-icon>
              <v-icon v-if="room.bookmarked" color="warning">
                mdi-bookmark-check
              </v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
          <v-card-text>
            <v-text-field
              v-model="inputedRoomName"
              :counter="maxLengthRoomName"
              :rules="roomNameRules"
              label="名称"
              autofocus
              required
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!valid"
              @click="
                dialog = false
                createRoom(inputedRoomName)
              "
            >
              登録
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Room } from '~/store/rooms/type'

const MAX_LENGTH_ROOM_NAME = 50
export default Vue.extend({
  data() {
    return {
      searchText: '',
      dialog: false,
      valid: true,
      inputedRoomName: '',
      roomNameRules: [
        (v: string) => !!v || '必須項目です。',
        (v: string) =>
          (v && v.length <= MAX_LENGTH_ROOM_NAME) ||
          MAX_LENGTH_ROOM_NAME + '文字以内で入力してください。'
      ],
      maxLengthRoomName: MAX_LENGTH_ROOM_NAME
    }
  },
  computed: {
    rooms() {
      const searchText = this.$data.searchText
      if (searchText.length) {
        return this.$exStore.getters['rooms/findIncludeName'](searchText)
      } else {
        return this.$exStore.getters['rooms/rooms']
      }
    }
  },
  mounted() {
    this.fetchRooms()
  },
  methods: {
    fetchRooms() {
      this.$exStore.dispatch('rooms/asyncFetchRooms')
    },
    createRoom(roomName: string) {
      this.$exStore.dispatch('rooms/asyncCreateRoom', { name: roomName })
      this.$data.inputedRoomName = ''
    },
    bookmark(room: Room) {
      this.$exStore.dispatch('rooms/bookmarkRoom', { room })
    }
  }
})
</script>
