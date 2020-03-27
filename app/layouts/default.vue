<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" fixed app>
      <AppRooms />
    </v-navigation-drawer>
    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-app-bar-nav-icon @click.stop="rightDrawer = !rightDrawer" />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer v-model="rightDrawer" :right="true" fixed app>
      <AppRoomComments />
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span
        >&copy; {{ new Date().getFullYear() }} {{ authorName }} All Rights
        Reserved.</span
      >
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import AppRooms from '~/components/AppRooms.vue'
import AppRoomComments from '~/components/AppRoomComments.vue'

export default Vue.extend({
  components: {
    AppRooms,
    AppRoomComments
  },
  data() {
    return {
      drawer: false,
      fixed: false,
      rightDrawer: false,
      authorName: process.env.AUTHOR_NAME
    }
  },
  computed: {
    title() {
      const app = this.$store.$exStore.getters['app/settings']
      return app.title || process.env.APP_TITLE
    }
  }
})
</script>
