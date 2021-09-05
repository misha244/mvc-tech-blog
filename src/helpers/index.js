const moment = require("moment");

const formatDate = (date) => {
  return moment(date).format("DD/MM/YYYY - HH:mm");
};

const shortenBody = (body) => {
  const newBody = body.split(" ").slice(0, 50).join(" ");
  return `${newBody} ...`;
};

const isUserComment = (user, commentUser, options) => {
  if (user === commentUser) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
};

module.exports = {
  shortenBody,
  formatDate,
  isUserComment,
};
