const constants = {
  // page constants
  confirmLeavePageTitle: "Leave this page?",
  confirmLeavePageMessage: "Do you want to leave this page?",
  // firestore
  dbRoomCollection: "rooms",
  dbChatCollection: "chats",
  dbOrderByCreatedDate: "date_created",
  ascOrder: "asc",
  // firestore collenction or document names
  rooms: "rooms",
  usernames: "usernames",
  // socket.io
  socketJoin: "join",
  socketMessage: "message",
  socketRoomData: "roomData",
  socketDisconnected: "disconnected",
  socketSendMessage: "sendMessage",
  // Error messagess
  fetchUserError: "Fetch User Error",
  roomAlreadyExsistsError: "Room is already exist",
  roomNotExsistsError: "Room does not exists",
  roomAlreadyExixtsError: "This room name is already taken",
  createRoomError: "Creatting Room Error",
  updateMessageError: "Update Message Error",
  fetchMessageError: "FetchMessageError",
  joinRoomError: "Something wrong happen with the system",
  userNameExistsError: "This user name is taken",
  undefinedErrorMessage: "Undefined error",
  retrievingUsernameError: "There's probrem with retrieving username",
  userNotFoundInChatError:
    "Your username were not found in the chat room, please re-join this room again.",
  requireRoomNameError: "Room name is required.",
};

export default constants;
