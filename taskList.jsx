TaskList = React.createClass({
	propTypes: {
	    tasks: React.PropTypes.array.isRequired,
	    currentUser: React.PropTypes.object
	},

	renderTasks() {
	    return this.props.tasks.map((task) => {
	    const currentUserId = this.props.currentUser && this.props.currentUser._id;
	    const showPrivateButton = task.owner === currentUserId
	    return <Task key={task._id} 
	              	 showPrivateButton={showPrivateButton}
	                 task={task} />;
	    });
	},

	render(){
		return(
			<ul>
				{this.renderTasks()}
			</ul>
		)
	}
})