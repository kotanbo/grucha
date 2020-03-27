<template>
  <v-list>
    <v-list-item-group :mandatory="true">
      <v-list-item @click="dialog = !dialog">
        <v-list-item-action>
          <v-icon>mdi-plus-circle</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            ルーム作成
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-for="(room, index) in rooms" :key="index">
        <v-list-item-content @click="selectRoom(room)">
          <v-list-item-title v-text="room.name" />
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card-text>
            <v-text-field
              v-model="inputedRoomName"
              :counter="maxLengthRoomName"
              :rules="roomNameRules"
              label="名称"
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
              >登録</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-list>
</template>

<script lang="ts">
import Vue from 'vue'
import { Room } from '~/store/rooms/type'

const MAX_LENGTH_ROOM_NAME = 50
export default Vue.extend({
  data() {
    return {
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
      const rooms = this.$exStore.getters['rooms/rooms']
      // const rooms: Array<Room> = []
      return rooms
    }
  },
  mounted() {
    this.$exStore.dispatch('rooms/fetchRooms')
  },
  methods: {
    selectRoom(room: Room) {
      this.$exStore.dispatch('rooms/selectRoom', { room })
      this.$exStore.dispatch('app/setTitle', { title: room.name })
    },
    createRoom(roomName: string) {
      this.$exStore.dispatch('rooms/createRoom', { name: roomName })
    }
  }
})
</script>
