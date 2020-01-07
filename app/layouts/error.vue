<template>
  <v-app dark>
    <h1>
      {{ errorMessage }}
    </h1>
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
    const title = this.errorMessage
    return {
      title
    }
  }

  private getErrorMessage(): string {
    return this.error.statusCode === 404
      ? 'ページが見つかりませんでした。'
      : 'エラーが発生しました。'
  }

  private errorMessage = this.getErrorMessage()
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
