import 'vuex'
import * as App from '~/store/app/type'
import * as User from '~/store/user/type'
import * as Rooms from '~/store/rooms/type'
import * as Posts from '~/store/rooms/posts/type'

declare module 'vuex' {
  type RootState = {
    app: App.S
    user: User.S
    rooms: Rooms.S & {
      posts: Posts.S
    }
  }
  type RootGetters = App.RG & User.RG & Rooms.RG & Posts.RG
  type RootMutations = App.RM & User.RM & Rooms.RM
  type RootActions = App.RA & User.RA & Rooms.RA & Posts.RA
}
