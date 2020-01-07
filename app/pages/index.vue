<template>
  <v-card class="mx-auto">
    <v-list subheader>
      <v-list-item v-for="(group, i) in groups" :key="i" @click="showChat">
        <v-list-item-content>
          <v-list-item-title v-text="group.title"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class extends Vue {
  private groups: Array<Record<string, string>> = [
    {
      title: 'グループ１'
    },
    {
      title: 'グループ２'
    }
  ]

  private showChat(): void {
    return
  }
}
</script>
