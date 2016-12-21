const expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', ()=>{
	var from = 'Rick';
	var text = 'Wubalubadubdub!';
	var message = generateMessage(from, text);

	expect(message.createdAt).toBeA('number');
	expect(message).toInclude({from, text});
    });
});
