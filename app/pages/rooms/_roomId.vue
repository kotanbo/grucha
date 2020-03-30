<template>
  <AppChat />
</template>

<script lang="ts">
import Vue from 'vue'
import AppChat from '~/components/AppChat.vue'
import { Room } from '~/store/rooms/type'

export default Vue.extend({
  components: {
    AppChat
  },
  async asyncData(ctx) {
    if (!ctx.app.$exStore.getters['rooms/isRooms']) {
      await ctx.app.$exStore.dispatch('rooms/asyncFetchRooms')
    }
    const room = ctx.app.$exStore.getters['rooms/getRoom'](ctx.params.roomId)
    if (!room) {
      ctx.redirect('/')
      return {}
    }
    ctx.app.$exStore.dispatch('rooms/selectRoom', { room })
    ctx.app.$exStore.dispatch('app/setTitle', { title: room.name })

    return {
      room
    }
  },
  head() {
    const room = this.$data.room
    return {
      title: room.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `「${room.name}」のグループチャット`
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
