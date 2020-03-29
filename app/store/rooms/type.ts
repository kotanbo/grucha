export interface Room {
  id: string | undefined
  name: string
  comments: string[]
  createdAt: {}
}

export interface S {
  rooms: Room[]
  selectedRoom: Room | undefined
}

export interface G {
  isRooms: boolean
  rooms: Room[]
  selectedRoom: Room | undefined
  selectedRoomComments: string[]
  findIncludeName: (name: string) => Room[]
  getRoom: (id: string) => Room | undefined
}
export interface RG {
  'rooms/isRooms': G['isRooms']
  'rooms/rooms': G['rooms']
  'rooms/selectedRoom': G['selectedRoom']
  'rooms/selectedRoomComments': G['selectedRoomComments']
  'rooms/findIncludeName': G['findIncludeName']
  'rooms/getRoom': G['getRoom']
}

export interface M {
  clearRooms: {}
  addRoom: { room: Room }
  unshiftRoom: { room: Room }
  setRoom: { room: Room }
  selectRoom: { room: Room }
}
export interface RM {
  'rooms/clearRooms': M['clearRooms']
  'rooms/addRoom': M['addRoom']
  'rooms/unshiftRoom': M['unshiftRoom']
  'rooms/setRoom': M['setRoom']
  'rooms/selectRoom': M['selectRoom']
}

export interface A {
  asyncFetchRooms: {}
  selectRoom: { room: Room }
  asyncCreateRoom: { name: string }
  asyncAddRoomComment: { room: Room; comment: string }
}
export interface RA {
  'rooms/asyncFetchRooms': A['asyncFetchRooms']
  'rooms/selectRoom': A['selectRoom']
  'rooms/asyncCreateRoom': A['asyncCreateRoom']
  'rooms/asyncAddRoomComment': A['asyncAddRoomComment']
}
