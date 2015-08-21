Tasks = new Mongo.Collection("tasks");
if (Meteor.isClient) {
  // This code is executed on the client only
  Meteor.subscribe("tasks");
  Meteor.startup(function () {
  	Accounts.ui.config({
	  passwordSignupFields: "USERNAME_ONLY"
	});
    // Use Meteor.startup to render the component after the page is ready
    React.render(<App />, document.getElementById("render-target"));
  });
}

if (Meteor.isServer){
	Meteor.publish('tasks', function(){
		return Tasks.find({
			$or: [
				{ private: {$ne: true} },
				{ owner: this.userId }
			]
		});
	})
}

Meteor.methods({
	addTask(text){
		if (!Meteor.userId())
			throw new Meteor.Error('not-authorized');

		Tasks.insert({
      		text:text,
      		createdAt: new Date(),
      		owner: Meteor.userId(),
      		username: Meteor.user().username
		});
	},

	removeTask(taskId) {
		const task = Tasks.findOne(taskId);
	    if (task.private && task.owner !== Meteor.userId()) {
	      throw new Meteor.Error("not-authorized");
	    }
 		if (task.owner === Meteor.userId())
    		Tasks.remove(taskId);
 	},

 	setChecked(taskId, setChecked) {
  	  	const task = Tasks.findOne(taskId);
	    if (task.private && task.owner !== Meteor.userId()) {
	      throw new Meteor.Error("not-authorized");
	    }

	    if (task.owner === Meteor.userId()) {
  	  		Tasks.update(taskId, { $set: { checked: setChecked} });
	    } else {
	    	throw new Meteor.Error('not-authorized')
	    }
  	},

  	setPrivate(taskId, setToPrivate){
  		const task = Tasks.findOne(taskId);

  		if (task.owner !== Meteor.userId())
  			throw new Meteor.Error('not-authorized')

  		Tasks.update(taskId, { $set: {private: setToPrivate}})
  	}

})