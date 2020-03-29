<template>
  <v-card v-if="canChat">
    <v-toolbar>
      <v-row>
        <v-col>
          <v-text-field
            v-model="searchText"
            :hide-details="true"
            placeholder="チャット検索"
            clearable
          ></v-text-field>
        </v-col>
      </v-row>
    </v-toolbar>
    <v-card class="mt-10">
      <v-btn
        color="primary"
        small
        absolute
        top
        right
        fab
        @click="dialog = !dialog"
      >
        <v-icon>mdi-message-plus</v-icon>
      </v-btn>
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
        </v-list-item>
      </v-list>
    </v-card>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
          <v-card-text>
            <v-textarea
              v-model="inputedPostBody"
              :autofocus="true"
              :counter="maxLengthPostBody"
              :rules="postRules"
              prepend-inner-icon="mdi-comment-text"
              rows="5"
              required
            ></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!valid"
              @click="
                dialog = false
                createPost(inputedPostBody)
              "
            >
              投稿
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'

const MAX_LENGTH_POST_BODY = 200
export default Vue.extend({
  data() {
    return {
      searchText: '',
      dialog: false,
      valid: true,
      inputedPostBody: '',
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
      const room = this.$exStore.getters['rooms/selectedRoom']
      return room && room.id
    }
  },
  methods: {
    createPost(body: string) {
      const room = this.$exStore.getters['rooms/selectedRoom']
      if (!room || !room.id) {
        return
      }
      this.$exStore.dispatch('rooms/posts/asyncCreatePost', { room, body })
      this.$data.inputedPostBody = ''
    }
  }
})
</script>
