<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
        <v-card-text>
          <v-text-field
            v-model="inputedRoomName"
            :counter="maxLengthRoomName"
            :rules="roomNameRules"
            label="ルーム名"
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
              saveRoom(inputedRoomName)
            "
          >
            登録
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { Room } from '~/store/rooms/type'

const MAX_LENGTH_ROOM_NAME = 50
export default Vue.extend({
  data() {
    return {
      editType: false,
      callback: undefined as ((room?: Room) => void) | undefined,
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
  methods: {
    // 外部からコール
    display(editType = false, callback?: (room?: Room) => void) {
      this.editType = editType
      this.callback = callback
      if (this.editType) {
        const room = this.$exStore.getters['rooms/selectedRoom']
        if (room) {
          this.inputedRoomName = room.name
        }
      }
      this.$data.dialog = true
    },
    saveRoom(roomName: string) {
      if (this.editType) {
        const room = this.$exStore.getters['rooms/selectedRoom']
        if (room) {
          this.$exStore
            .dispatch('rooms/asyncEditRoom', {
              room,
              name: roomName
            })
            .then(() => {
              if (this.callback) {
                const room = this.$exStore.getters['rooms/selectedRoom']
                this.callback(room)
              }
            })
        }
      } else {
        this.$exStore
          .dispatch('rooms/asyncCreateRoom', { name: roomName })
          .then(() => {
            if (this.callback) {
              const room = this.$exStore.getters['rooms/selectedRoom']
              this.callback(room)
            }
          })
      }
      this.$data.inputedRoomName = ''
    }
  }
})
</script>
