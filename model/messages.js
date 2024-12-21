const DbClient = require("./DbClient");

class DbMessagesHandler {
  static client = DbClient.client;

  static async createMessage({ userId, message, toId = null }) {
    const { data, error } = await this.client
      .from("messages")
      .insert({
        user_id: userId,
        message,
        to_user_id: toId,
      })
      .select(
        "id, user_id, created_at, message, from:users!messages_user_id_fkey(username), to:users!messages_to_user_id_fkey(username)"
      );
    return { data, error };
  }

  static async getMessages(limit, userId) {
    const { data, error } = await this.client
      .from("messages")
      .select(
        "id, user_id, created_at, message, from:users!messages_user_id_fkey(username), to:users!messages_to_user_id_fkey(username)"
      )
      .or(`to_user_id.is.null,to_user_id.eq.${userId},user_id.eq.${userId}`)
      .limit(limit)
      .order("id", { ascending: false });
    if (data) data.reverse();

    return { data, error };
  }
}

exports.dbMessages = {
  _dbHandler: DbMessagesHandler,
  createMessage: async function ({ userId, message, toId = null }) {
    const { data, error } = await this._dbHandler.createMessage({
      userId,
      message,
      toId,
    });
    return { data, error };
  },
  getMessages: async function (userId) {
    const { data, error } = await this._dbHandler.getMessages(20, userId);
    return { data, error };
  },
};
