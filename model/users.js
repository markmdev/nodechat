const DbClient = require("./DbClient");

class DbUsersHandler {
  static client = DbClient.client;

  static async createUser({ username, password }) {
    const { data, error } = await this.client
      .from("users")
      .insert({ username, password })
      .select();
    return { data, error };
  }

  static async findByUsername(username) {
    const { data, error } = await this.client
      .from("users")
      .select()
      .eq("username", username);
    return { data, error };
  }
}

exports.dbUsers = {
  _dbHandler: DbUsersHandler,
  createUser: async function ({ username, password }) {
    const { data, error } = await this._dbHandler.createUser({
      username,
      password,
    });
    return { data, error };
  },
  findByUsername: async function (username) {
    const { data, error } = await this._dbHandler.findByUsername(username);
    return { data, error };
  },
};
