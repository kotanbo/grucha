<template>
  <div>
    <v-list>
      <v-list-item @click="dialog = !dialog">
        <v-list-item-action>
          <v-icon color="primary">mdi-comment</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            コメント追加
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item v-for="(comment, index) in comments" :key="index">
        <v-list-item-content>
          <v-list-item-title style="white-space: pre-wrap;" v-text="comment" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-dialog v-model="dialog" max-width="500px" @submit.prevent>
      <v-card>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card-text>
            <v-textarea
              v-model="inputedRoomComment"
              :counter="maxLengthRoomComment"
              :rules="roomCommentRules"
              label="コメント"
              autofocus
              required
            ></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!valid"
              @click="
                dialog = false
                addRoomComment(inputedRoomComment)
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

const MAX_LENGTH_ROOM_COMMENT = 200
export default Vue.extend({
  data() {
    return {
      dialog: false,
      valid: true,
      inputedRoomComment: '',
      roomCommentRules: [
        (v: string) => !!v || '必須項目です。',
        (v: string) =>
          (v && v.length <= MAX_LENGTH_ROOM_COMMENT) ||
          MAX_LENGTH_ROOM_COMMENT + '文字以内で入力してください。'
      ],
      maxLengthRoomComment: MAX_LENGTH_ROOM_COMMENT
    }
  },
  computed: {
    comments() {
      const comments = this.$exStore.getters['rooms/selectedRoomComments']
      return comments
    }
  },
  methods: {
    addRoomComment(comment: string) {
      const room = this.$exStore.getters['rooms/selectedRoom']
      if (!room || !room.id) {
        return
      }
      this.$exStore.dispatch('rooms/asyncAddRoomComment', { room, comment })
      this.$data.inputedRoomComment = ''
    }
  }
})
</script>
