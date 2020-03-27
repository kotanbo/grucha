import 'vuex'
import * as App from '~/store/app/type'
import * as Rooms from '~/store/rooms/type'

declare module 'vuex' {
  type RootState = {
    app: App.S
    rooms: Rooms.S
  }
  type RootGetters = App.RG & Rooms.RG
  type RootMutations = App.RM & Rooms.RM
  type RootActions = App.RA & Rooms.RA
}
