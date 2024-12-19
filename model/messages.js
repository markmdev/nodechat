const DbClient = require("./DbClient");

class DbMessagesHandler {
  static client = DbClient.client;

  static async createMessage({ userId, message }) {
    const { data, error } = await this.client
      .from("messages")
      .insert({ user_id: userId, message })
      .select();
    return { data, error };
  }

  static async getMessages(limit) {
    const { data, error } = await this.client
      .from("messages")
      .select("id, user_id, created_at, message, users!inner(username)")
      .limit(limit)
      .order("id", { ascending: false });
    if (data) data.reverse();
    return { data, error };
  }
}

exports.dbMessages = {
  _dbHandler: DbMessagesHandler,
  createMessage: async function ({ userId, message }) {
    const { data, error } = await this._dbHandler.createMessage({
      userId,
      message,
    });
    return { data, error };
  },
  getMessages: async function () {
    const { data, error } = await this._dbHandler.getMessages(20);
    return { data, error };
  },
};
