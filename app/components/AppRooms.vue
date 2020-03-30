<template>
  <div>
    <v-list>
      <v-list-item>
        <v-btn fab small color="indigo" class="mr-5" @click="displayRoomForm">
          <v-icon>mdi-folder-plus</v-icon>
        </v-btn>
        <v-btn fab small color="green" class="mr-5" @click="fetchRooms">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
        <v-btn fab small color="secondary" to="/">
          <v-icon>mdi-home</v-icon>
        </v-btn>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-text-field
            v-model="searchText"
            placeholder="ルーム検索"
          ></v-text-field>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item-group mandatory>
        <v-list-item
          v-for="(room, index) in rooms"
          :key="index"
          :to="`/rooms/${room.id}`"
        >
          <v-list-item-content>
            <v-list-item-title v-text="room.name" />
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click="bookmark(room)">
              <v-icon v-if="!room.bookmarked">mdi-bookmark</v-icon>
              <v-icon v-if="room.bookmarked" color="warning">
                mdi-bookmark-check
              </v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <AppRoomForm ref="roomForm" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Room } from '~/store/rooms/type'
import AppRoomForm from '~/components/AppRoomForm.vue'

const MAX_LENGTH_ROOM_NAME = 50
export default Vue.extend({
  components: {
    AppRoomForm
  },
  data() {
    return {
      searchText: '',
      valid: true,
      inputedRoomName: '',
      roomNameRules: [
        (v: string) => !!v || '必須項目です。',
        (v: string) =>
          (v && v.length <= MAX_LENGTH_ROOM_NAME) ||
          MAX_LENGTH_ROOM_NAME + '文字以内で入力してください。'
      ],
      maxLengthRoomName: MAX_LENGTH_ROOM_NAME
    }
  },
  computed: {
    rooms() {
      const searchText = this.$data.searchText
      if (searchText.length) {
        return this.$exStore.getters['rooms/findIncludeName'](searchText)
      } else {
        return this.$exStore.getters['rooms/rooms']
      }
    }
  },
  mounted() {
    this.fetchRooms()
  },
  methods: {
    fetchRooms() {
      this.$exStore.dispatch('rooms/asyncFetchRooms')
    },
    displayRoomForm() {
      const form: any = this.$refs.roomForm
      form.display()
    },
    bookmark(room: Room) {
      this.$exStore.dispatch('rooms/bookmarkRoom', { room })
    }
  }
})
</script>
