<template>
  <div></div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
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
