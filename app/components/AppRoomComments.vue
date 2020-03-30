<template>
  <div>
    <v-list>
      <v-list-item v-if="canComment">
        <v-list-item-action>
          <v-btn fab small color="teal" @click="displayRoomCommentDialog">
            <v-icon>mdi-comment</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
      <v-divider v-if="canComment"></v-divider>
      <v-list-item v-for="(comment, index) in comments" :key="index">
        <v-list-item-content>
          <v-list-item-title style="white-space: pre-wrap;" v-text="comment" />
        </v-list-item-content>
        <v-list-item-action v-if="canComment">
          <v-speed-dial v-model="fab" absolute bottom right direction="left">
            <template v-slot:activator>
              <v-btn v-model="fab" color="blue" fab small>
                <v-icon v-if="fab">mdi-close</v-icon>
                <v-icon v-else>mdi-comment-text</v-icon>
              </v-btn>
            </template>
            <v-btn
              fab
              x-small
              color="green"
              @click="displayRoomCommentDialog(index)"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn fab x-small color="red" @click="deleteRoomComment(index)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-speed-dial>
        </v-list-item-action>
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
              label="ルームのコメント"
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
                saveRoomComment(inputedRoomComment, editCommentIndex)
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
      fab: false,
      dialog: false,
      valid: true,
      inputedRoomComment: '',
      editCommentIndex: undefined as number | undefined,
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
    },
    canComment() {
      return this.$exStore.getters['rooms/canUpdateRoom']
    }
  },
  methods: {
    displayRoomCommentDialog(editCommentIndex?: number) {
      const room = this.$exStore.getters['rooms/selectedRoom']
      if (!room) {
        return
      }
      if (editCommentIndex !== undefined) {
        this.inputedRoomComment = room.comments[editCommentIndex]
      }
      this.editCommentIndex = editCommentIndex
      this.dialog = !this.dialog
    },
    saveRoomComment(comment: string, editCommentIndex?: number) {
      const room = this.$exStore.getters['rooms/selectedRoom']
      if (!room) {
        return
      }
      if (editCommentIndex !== undefined) {
        this.$exStore.dispatch('rooms/asyncEditRoomComment', {
          room,
          comment,
          commentIndex: editCommentIndex
        })
      } else {
        this.$exStore.dispatch('rooms/asyncAddRoomComment', { room, comment })
      }
      this.$data.inputedRoomComment = ''
    },
    deleteRoomComment(commentIndex: number) {
      const room = this.$exStore.getters['rooms/selectedRoom']
      if (!room) {
        return
      }
      const comment = room.comments[commentIndex]
      if (confirm(comment + '\n\nを削除しますか？')) {
        this.$exStore.dispatch('rooms/asyncDeleteRoomComment', {
          room,
          commentIndex
        })
      }
    }
  }
})
</script>
