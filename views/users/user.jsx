var React = require("react");

class Home extends React.Component {
  render() {
    //console.log(this);
    let userlist = this.props.user.map(users => {

      return (
        <li>
          {users.name}
        </li> 
      )
    })


    return (
      <html>
        <head />
        <body>
          <h1>User 1</h1>
          <ul>
            {userlist}
          </ul>
        </body>
      </html>
    );
  }
}

module.exports = Home;
