var React = require('react');

var Repos = React.createClass({
  propTypes : {
    username: React.PropTypes.string.isRequired,
    repos: React.PropTypes.array.isRequired
  },
  render () {
    return (
      <div>
        <p>REPOS</p>
        {this.props.repos}
      </div>
    )
  }
})

module.exports = Repos
