var React = require('react');

var Repos = React.createClass({
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
