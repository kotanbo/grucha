import 'vuex'
import * as App from '~/store/app/type'
import * as Rooms from '~/store/rooms/type'
import * as Posts from '~/store/rooms/posts/type'

declare module 'vuex' {
  type RootState = {
    app: App.S
    rooms: Rooms.S & {
      posts: Posts.S
    }
  }
  type RootGetters = App.RG & Rooms.RG & Posts.RG
  type RootMutations = App.RM & Rooms.RM & Posts.RM
  type RootActions = App.RA & Rooms.RA & Posts.RA
}
