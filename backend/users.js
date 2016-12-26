[{
    id: 'socketid',
    username: 'username',
    room: 'general'    
}]


// 
// 
// 
// 

class Users {
    /* constructor function gets called by default when an object is created */
    /* arguments from new User() are passed to it */
    constructor () {
	this.users = [];
    }

    addUser(id,username,channel) {
	var user = {id, username, channel};
	this.users.push(user);
	return user;
    }


    getUser(id) {
	var user = this.users.filter((user)=>{
	    /* return true to keep in the array and false to remove him */
	    return user.id === id;
	})[0];
	
	return user;
    }

    removeUser(id) {
	var user = this.getUser(id);

	if (user) {
	    this.users = this.users.filter((id)=>{
		/* Filter out a user with this id. Return everyone else*/
		return user.id !== id;
	    });
	}

	
	return user;
    }

    getUserList(channel) {
	var users = this.users.filter((user)=>{
	    /* return true to keep in the array and false to remove him */
	    return user.channel === channel;
	});
	var namesArray = users.map((user) => {
	    return user.username;
	});
	return namesArray;
    }
}

var troy = new Users("Troy", "Dreamatorium");

module.exports = {Users};
