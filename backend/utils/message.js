const moment = require('moment');

var generateMessage = (author, body) => {
    return {
	author,
	body,
	createdAt: moment().valueOf()
    }
};

module.exports = {generateMessage};
