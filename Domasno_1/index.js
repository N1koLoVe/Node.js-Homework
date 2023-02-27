const colors = require("colors");

let users = [
  {
    role: "admin",
    fullname: "John Doe",
    username: "qwerty",
    password: "123qwe",
  },
  {
    role: "client",
    fullName: "Bob Bobski",
    username: "asdasd",
    password: "zxczxc",
  },
];

const userLogin = (username, password) => {
  for (user of users) {
    if (username === user.username && password === user.password) {
      return "User is logged in".green;
    } else {
      return "User not found".red.bgYellow;
    }
  }
};

console.log(userLogin("qwerty", "123qwe"));
console.log(userLogin("qwerty", "123q22we"));
