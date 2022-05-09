const sql = require("./db.js");

// constructor
const User = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    bank_name: { type: 'string' },
    phone: { type: 'string' },
    full_name: { type: 'string' },
    citizen_id: { type: 'string' },
    user_name: { type: 'string' },
    password: { type: 'string' },
    smart_otp: { type: 'string' },
  },
  require: [
    'id, bank_name, phone, full_name, citizen_id, user_name, password, smart_otp ',
  ],
  additionalProperties: false,
};

User.create = (newTutorial, result) => {
  sql.query("INSERT INTO users SET ?", newTutorial, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created tutorial: ", { id: res.insertId, ...newTutorial });
    result(null, { id: res.insertId, ...newTutorial });
  });
};

User.findById = (id, result) => {
  sql.query(`SELECT * FROM users WHERE id = ?`,id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

User.getAll = (title, result) => {
  let query = "SELECT * FROM users";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

User.getAllPublished = result => {
  sql.query("SELECT * FROM users WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

module.exports = User;
