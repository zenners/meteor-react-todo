// App component - represents the whole app
App = React.createClass({
  mixins: [ReactMeteorData],

  getInitialState() {
    return {
      hideCompleted: false 
    };
  },

  getMeteorData(){
    let query = {};
    if(this.state.hideCompleted) {
      query = {checked: {$ne: true}};
    }
    return {
      tasks: Tasks.find(query, {sort: {createdAt: -1}}).fetch(),
      incompleteCount: Tasks.find({checked: {$ne: true}}).count(),
      currentUser: Meteor.user()
    }
  },

  toggleHideCompleted(){
    this.setState({
      hideCompleted: !this.state.hideCompleted
    })
  },

  render() {
    console.log(typeof this.data.currentUser)
    return (
      <div className="container">
        <header>
           <h1>Todo List ({this.data.incompleteCount})</h1>
        </header>
        <label className='hide-component'>
          <input type='checkbox'
                  readOnly={true}
                  checked={this.state.hideCompleted}
                  onClick={this.toggleHideCompleted} />
          Hide Completed Tasks
        </label>
        <AccountsUIWrapper />

        <Form currentUser={this.data.currentUser} />
        <TaskList tasks={this.data.tasks} currentUser={this.data.currentUser} />      
       
      </div>
    );
  }
});