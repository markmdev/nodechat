const OnlineUsers = {
  // usersListItem: {user, socket}
  // user: {id, username}
  usersList: [],
  findUserByUsername(username) {
    return this.usersList.find(
      (userItem) => userItem.user.username === username
    );
  },
  findUserById(id) {
    return this.usersList.find((userItem) => {
      return userItem.user.id === Number(id);
    });
  },
  deleteUserByUsername(username) {
    this.usersList = this.usersList.filter(
      (userItem) => userItem.user.username !== username
    );
  },
  addNewUser(user, socket) {
    const newUser = {
      user,
      socket,
    };
    this.usersList.push(newUser);
  },
  getAllUsernames() {
    return this.usersList.map((user) => user.user.username);
  },
};

module.exports = { OnlineUsers };
