<template>
  <v-card v-if="canChat">
    <v-toolbar>
      <v-row>
        <v-col>
          <v-text-field
            v-model="searchText"
            placeholder="チャット検索"
            hide-details
            clearable
          ></v-text-field>
        </v-col>
      </v-row>
    </v-toolbar>
    <v-list v-if="posts.length" two-line>
      <v-list-item v-for="(post, index) in posts" :key="index">
        <v-list-item-content>
          <v-list-item-title
            style="white-space: pre-wrap;"
            v-text="post.body"
          ></v-list-item-title>
          <v-list-item-subtitle
            v-text="post.createdAt.toDate().toLocaleString()"
          ></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action v-if="canUpdatePost(post)">
          <v-list-item>
            <v-btn fab x-small color="green" @click="displayPostDialog(post)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
              fab
              x-small
              color="red"
              class="ml-5"
              @click="deletePost(post)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-btn
      fab
      fixed
      bottom
      right
      color="indigo"
      style="z-index:9"
      @click="displayPostDialog()"
    >
      <v-icon>mdi-wechat</v-icon>
    </v-btn>
    <v-speed-dial
      v-if="canUpdateRoom"
      v-model="fab"
      fixed
      bottom
      right
      direction="left"
      style="z-index:9; margin-right: 70px"
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="blue" fab>
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-gamepad</v-icon>
        </v-btn>
      </template>
      <v-btn fab small color="green" @click="editRoom">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn fab small color="red" @click="deleteRoom">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-speed-dial>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
          <v-card-text>
            <v-textarea
              v-model="inputedPostBody"
              :counter="maxLengthPostBody"
              :rules="postRules"
              prepend-inner-icon="mdi-comment-text"
              rows="5"
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
                savePost(inputedPostBody, editPost)
              "
            >
              投稿
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <AppRoomForm ref="roomForm" />
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Room } from '~/store/rooms/type'
import { Post } from '~/store/rooms/posts/type'
import AppRoomForm from '~/components/AppRoomForm.vue'

const MAX_LENGTH_POST_BODY = 200
export default Vue.extend({
  components: {
    AppRoomForm
  },
  data() {
    return {
      searchText: '',
      fab: false,
      dialog: false,
      valid: true,
      inputedPostBody: '',
      editPost: undefined as Post | undefined,
      postRules: [
        (v: string) => !!v || '必須項目です。',
        (v: string) =>
          (v && v.length <= MAX_LENGTH_POST_BODY) ||
          MAX_LENGTH_POST_BODY + '文字以内で入力してください。'
      ],
      maxLengthPostBody: MAX_LENGTH_POST_BODY
    }
  },
  computed: {
    posts() {
      const searchText = this.$data.searchText
      if (searchText.length) {
        return this.$exStore.getters['rooms/posts/findIncludeBody'](searchText)
      } else {
        return this.$exStore.getters['rooms/posts/posts']
      }
    },
    canChat() {
      return this.$exStore.getters['rooms/isSelectedRoom']
    },
    canUpdateRoom() {
      return this.$exStore.getters['rooms/canUpdateRoom']
    }
  },
  methods: {
    editRoom() {
      const room = this.$exStore.getters['rooms/selectedRoom']
      if (!room) {
        return
      }
      const editType = true
      const callback = (room: Room) => {
        this.$exStore.dispatch('app/setTitle', { title: room.name })
      }
      const form: any = this.$refs.roomForm
      form.display(editType, callback)
    },
    deleteRoom() {
      const room = this.$exStore.getters['rooms/selectedRoom']
      if (!room) {
        return
      }
      if (confirm(room.name + '\n\nを削除しますか？')) {
        this.$exStore.dispatch('rooms/asyncDeleteRoom', { room }).then(() => {
          this.$exStore.dispatch('app/setTitle', {
            title: process.env.APP_TITLE
          })
        })
      }
    },
    canUpdatePost(post: Post) {
      const createdPostIds = this.$exStore.getters['rooms/posts/createdPostIds']
      return !!createdPostIds.find((v) => v === post.id)
    },
    displayPostDialog(post?: Post) {
      if (post !== undefined) {
        this.inputedPostBody = post.body
      }
      this.editPost = post
      this.dialog = !this.dialog
    },
    savePost(body: string, editPost?: Post) {
      const room = this.$exStore.getters['rooms/selectedRoom']
      if (!room) {
        return
      }
      if (editPost !== undefined) {
        this.$exStore.dispatch('rooms/posts/asyncEditPost', {
          room,
          post: editPost,
          body
        })
      } else {
        this.$exStore.dispatch('rooms/posts/asyncCreatePost', { room, body })
      }
      this.$data.inputedPostBody = ''
    },
    deletePost(post: Post) {
      const room = this.$exStore.getters['rooms/selectedRoom']
      if (!room) {
        return
      }
      if (confirm(post.body + '\n\nを削除しますか？')) {
        this.$exStore.dispatch('rooms/posts/asyncDeletePost', {
          room,
          post
        })
      }
    }
  }
})
</script>
