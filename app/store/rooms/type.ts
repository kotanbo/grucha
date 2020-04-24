export interface Room {
  id: string
  name: string
  comments: string[]
  createdBy: string
  createdAt: {}
  bookmarked: boolean
}

export interface S {
  rooms: Room[]
  selectedRoom?: Room
  bookmarkedRoomIds: string[]
}

export interface G {
  isRooms: boolean
  isSelectedRoom: boolean
  canUpdateRoom: boolean
  rooms: Room[]
  selectedRoom?: Room
  selectedRoomComments: string[]
  findIncludeName: (name: string) => Room[]
  getRoom: (id: string) => Room | undefined
}
export interface RG {
  'rooms/isRooms': G['isRooms']
  'rooms/isSelectedRoom': G['isSelectedRoom']
  'rooms/canUpdateRoom': G['canUpdateRoom']
  'rooms/rooms': G['rooms']
  'rooms/selectedRoom': G['selectedRoom']
  'rooms/selectedRoomComments': G['selectedRoomComments']
  'rooms/findIncludeName': G['findIncludeName']
  'rooms/getRoom': G['getRoom']
}

export interface M {
  clearRooms: {}
  addRoom: { room: Room }
  prependRoom: { room: Room }
  deleteRoom: { room: Room }
  setRoom: { room: Room }
  selectRoom: { room: Room }
  bookmarkRoom: { room: Room }
  setBookmarkRoomFromBookmarkedRoomIds: {}
}
export interface RM {
  'rooms/clearRooms': M['clearRooms']
  'rooms/addRoom': M['addRoom']
  'rooms/prependRoom': M['prependRoom']
  'rooms/deleteRoom': M['deleteRoom']
  'rooms/setRoom': M['setRoom']
  'rooms/selectRoom': M['selectRoom']
  'rooms/bookmarkRoom': M['bookmarkRoom']
  'rooms/setBookmarkRoomFromBookmarkedRoomIds': M['setBookmarkRoomFromBookmarkedRoomIds']
}

export interface A {
  asyncFetchRooms: {}
  asyncCreateRoom: { name: string }
  asyncEditRoom: { room: Room; name: string }
  asyncDeleteRoom: { room: Room }
  selectRoom: { room: Room }
  bookmarkRoom: { room: Room }
  asyncAddRoomComment: { room: Room; comment: string }
  asyncEditRoomComment: { room: Room; commentIndex: number; comment: string }
  asyncDeleteRoomComment: { room: Room; commentIndex: number }
}
export interface RA {
  'rooms/asyncFetchRooms': A['asyncFetchRooms']
  'rooms/asyncCreateRoom': A['asyncCreateRoom']
  'rooms/asyncEditRoom': A['asyncEditRoom']
  'rooms/asyncDeleteRoom': A['asyncDeleteRoom']
  'rooms/selectRoom': A['selectRoom']
  'rooms/bookmarkRoom': A['bookmarkRoom']
  'rooms/asyncAddRoomComment': A['asyncAddRoomComment']
  'rooms/asyncEditRoomComment': A['asyncEditRoomComment']
  'rooms/asyncDeleteRoomComment': A['asyncDeleteRoomComment']
}
