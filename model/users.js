const { createClient } = require("@supabase/supabase-js");

exports.users = [];

class DbHandler {
  static client = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );

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

exports.db = {
  _dbHandler: DbHandler,
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
