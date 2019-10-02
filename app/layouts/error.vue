<template>
  <v-app dark>
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <NuxtLink to="/">
      Home page
    </NuxtLink>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { NuxtError } from '@nuxt/types/app'

@Component
export default class extends Vue {
  private static layout = 'empty'

  @Prop({ type: Object, default: null })
  private error!: NuxtError

  private head(): object {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }

  private pageNotFound = '404 Not Found'
  private otherError = 'An error occurred'
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
