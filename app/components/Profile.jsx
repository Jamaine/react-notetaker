var React = require('react');
var Router = require('react-router');
var Repos = require('./github/Repos');
var UserProfile = require('./github/UserProfile');
var Notes = require('./notes/Notes');
var ReactFireMixin = require('reactfire')
var Firebase = require('firebase');

var Profile = React.createClass({
  // propTypes: {
  //   params:React.PropTypes.object.isRequired
  // },
  //  adds a few reactfire methods to "this"
  mixins:[ReactFireMixin],
  getInitialState () {
    return {
      notes: [1,2,3],
      bio: {name:'jake the dogg'},
      repos: ['a','b','c']
    }
  },
  componentDidMount () {
    this.ref = new Firebase('https://js-react-note-taker.firebaseio.com/');
    // this.ref.child() goes one level deep https://js-react-note-taker.firebaseio.com/ + username
    var childRef = this.ref.child(this.props.params.username);
    // method is from ReactFireMixin
    // ref to firebase, prop on state we want to bind our firebase data to
    // bind array found at childRef location to this.state.notes
    this.bindAsArray(childRef, 'notes')
  },
  componentWillUnount () {
    this.unbind('notes')
  },
  handleAddNote(newNote) {
    //  update firebase with new note
    // appends a new note to the end of our firebase
    // https://js-react-note-taker.firebaseio.com/ + this.props.params.username/ + this.state.notes.length/ add a newNote
    // https://js-react-note-taker.firebaseio.com/finnthehuman/1 = newNote
    this.ref.child(this.props.params.username).child(this.state.notes.length).set(newNote)
  },
  render () {
    return (
      <div className="row">
        <div className="col-md-4">
          <UserProfile username={this.props.params.username} bio={this.state.bio}/>
        </div>
        <div className="col-md-4">
          <Repos username={this.props.params.username} repos={this.state.repos}/>
        </div>
        <div className="col-md-4">
          <Notes
            username={this.props.params.username}
            notes={this.state.notes}
            addNote={this.handleAddNote}/>
        </div>
      </div>
    )
  }
})

module.exports = Profile;
