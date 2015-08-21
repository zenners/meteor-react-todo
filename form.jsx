Form = React.createClass({
	propTypes: {
		currentUser: React.PropTypes.object.isRequired
	},

	handleSubmit(e){
    	e.preventDefault();

    	var text = React.findDOMNode(this.refs.textInput).value.trim();
    	Meteor.call('addTask', text);

    	React.findDOMNode(this.refs.textInput).value = "";
  	},

	render(){
		return(
			<div>
				{ this.props.currentUser ?
		          <form className="new-task" onSubmit={this.handleSubmit} >
		            <input
		              type="text"
		              ref="textInput"
		              placeholder="Type to add new tasks" />
		          </form> : ''
		        }
	        </div>
		)	
	}
});

