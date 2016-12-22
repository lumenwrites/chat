const moment = require('moment');

var generateMessage = (from, text) => {
    return {
	from,
	text,
	createdAt: moment().valueOf()
    }
};

module.exports = {generateMessage};
