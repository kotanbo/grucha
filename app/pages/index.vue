<template>
  <div>
    <v-carousel v-model="model">
      <v-carousel-item v-for="(color, i) in colors" :key="color">
        <v-sheet :color="color" height="100%" tile>
          <v-row class="fill-height" align="center" justify="center">
            <div class="display-1 text-center" style="width: 70%">
              <div v-if="i === 0">
                1. ルーム作成<br /><br />
                左メニューの
                <v-icon x-large>mdi-folder-plus</v-icon>
                からルーム作成<br />
                （ルーム更新：
                <v-icon x-large>mdi-refresh</v-icon>
                ）
              </div>
              <div v-if="i === 1">
                2. ルーム選択<br /><br />
                左メニューのルームを選択 <br />
                （ブックマーク：
                <v-icon x-large>mdi-bookmark-check</v-icon>
                ）
              </div>
              <div v-if="i === 2">
                3. ルームコメント作成<br /><br />
                右メニューの
                <v-icon x-large>mdi-comment</v-icon>
                からルームコメント作成
              </div>
              <div v-if="i === 3">
                4. チャット<br /><br />
                右下の
                <v-icon x-large>mdi-wechat</v-icon>
                からチャット
              </div>
              <div v-if="i === 4">
                5. ルーム更新・削除<br /><br />
                右下の
                <v-icon x-large>mdi-gamepad</v-icon>
                からルーム更新・削除<br />（作成者のみ、一定期間のみ）
              </div>
              <div v-if="i === 5">
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

export default Vue.extend({
  data() {
    this.$exStore.dispatch('app/setTitle', {
      title: process.env.APP_TITLE
    })
    return {
      colors: [
        'primary',
        'secondary',
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
