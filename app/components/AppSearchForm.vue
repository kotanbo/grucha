<template>
  <v-form>
    <v-row>
      <v-col>
        <v-text-field
          v-model="searchText"
          placeholder="検索"
          clearable
        ></v-text-field>
      </v-col>
      <v-col>
        <v-btn icon @click="search">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'
import { posts } from '~/store/todo'

export default Vue.extend({
  data() {
    return {
      searchText: ''
    }
  },
  methods: {
    search(): void {
      alert(this.searchText)
    }
  }
})
</script>
