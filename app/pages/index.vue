<template>
  <div>
    <v-carousel v-model="model">
      <v-carousel-item v-for="(color, i) in colors" :key="color">
        <v-sheet :color="color" height="100%" tile>
          <v-row class="fill-height" align="center" justify="center">
            <div class="display-1 text-center" style="width: 70%">
              <div v-if="i === 0">
                登録不要のオープンなグループチャット<br /><br />
                ルームを作成しチャット<br />
                使い方の詳細は右へ
              </div>
              <div v-if="i === 1">
                1. ルーム作成<br /><br />
                左メニューの
                <AppIconDisplayRoomForm x-large />
                からルーム作成<br />
                （ルーム更新：
                <AppIconFetchRooms x-large />
                ）
              </div>
              <div v-if="i === 2">
                2. ルーム選択<br /><br />
                左メニューのルームを選択 <br />
                （ブックマーク：
                <AppIconBookmark x-large />
                ）
              </div>
              <div v-if="i === 3">
                3. ルームコメント作成<br /><br />
                右メニューの
                <AppIconDisplayRoomCommentForm x-large />
                からルームコメント作成
              </div>
              <div v-if="i === 4">
                4. チャット<br /><br />
                右下の
                <AppIconDisplayPostForm x-large />
                からチャット
              </div>
              <div v-if="i === 5">
                5. ルーム更新・削除<br /><br />
                右下の
                <AppIconUpdateRoom x-large />
                からルーム更新・削除<br />（作成者のみ、一定期間のみ）
              </div>
              <div v-if="i === 6">
                Have a good time 👍
              </div>
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AppIconDisplayRoomForm from '~/components/AppIconDisplayRoomForm.vue'
import AppIconFetchRooms from '~/components/AppIconFetchRooms.vue'
import AppIconBookmark from '~/components/AppIconBookmark.vue'
import AppIconDisplayRoomCommentForm from '~/components/AppIconDisplayRoomCommentForm.vue'
import AppIconDisplayPostForm from '~/components/AppIconDisplayPostForm.vue'
import AppIconUpdateRoom from '~/components/AppIconUpdateRoom.vue'

export default Vue.extend({
  components: {
    AppIconDisplayRoomForm,
    AppIconFetchRooms,
    AppIconBookmark,
    AppIconDisplayRoomCommentForm,
    AppIconDisplayPostForm,
    AppIconUpdateRoom
  },
  data() {
    this.$exStore.dispatch('app/setTitle', {
      title: process.env.APP_TITLE
    })
    return {
      colors: [
        'blue',
        'cyan',
        'amber',
        'yellow darken-4',
        'red lighten-2',
        'purple lighten-2',
        'green lighten-2'
      ],
      model: 0
    }
  },
  head() {
    return {
      title: process.env.APP_TITLE,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `「${process.env.APP_TITLE}」のホーム画面`
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: process.env.BASE_URL + this.$route.fullPath
        }
      ]
    }
  }
})
</script>
