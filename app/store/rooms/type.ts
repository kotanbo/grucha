export interface Room {
  id: string | null
  name: string
  comments: string[]
  createdAt: {}
}

export interface S {
  rooms: Room[]
  selectedRoom: Room | null
}

export interface G {
  rooms: Room[]
  selectedRoom: Room | null
  selectedRoomComments: string[] | undefined
}
export interface RG {
  'rooms/rooms': G['rooms']
  'rooms/selectedRoom': G['selectedRoom']
  'rooms/selectedRoomComments': G['selectedRoomComments']
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
  fetchRooms: {}
  selectRoom: { room: Room }
  createRoom: { name: string }
  addRoomComment: { room: Room; comment: string }
}
export interface RA {
  'rooms/fetchRooms': A['fetchRooms']
  'rooms/selectRoom': A['selectRoom']
  'rooms/createRoom': A['createRoom']
  'rooms/addRoomComment': A['addRoomComment']
}
