<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item
          v-for="(menu, i) in menus"
          :key="i"
          :to="menu.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ menu.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="menu.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-toolbar-items>
        <AppSearchForm />
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2019 {{ authorName }} All Rights Reserved.</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import AppSearchForm from '../components/AppSearchForm.vue'

@Component({
  components: {
    AppSearchForm
  }
})
export default class extends Vue {
  private clipped = false
  private drawer = false
  private fixed = false
  private menus = [
    {
      icon: 'mdi-format-list-bulleted',
      title: 'グループ一覧',
      to: '/'
    },
    {
      icon: 'mdi-face-profile',
      title: 'プロフィール',
      to: '/inspire'
    }
  ]
  private title = process.env.TITLE
  private authorName = process.env.AUTHOR_NAME
}
</script>
