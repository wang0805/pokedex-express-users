var React = require("react");

class Home extends React.Component {
  render() {
    //console.log(this);
    let userlist = this.props.user.map(users => {
      let aTag = '/user/'+users.id;

      return (
        <li key={users.id}>
          <a href={aTag}>{users.name}</a>
        </li> 
      )
    })


    return (
      <html>
        <head />
        <body>
          <h1>Welcome to Users</h1>
          <form method="GET" action='/user/new'>
            <input type="submit" value="New"/>
          </form>
          <ul>
            {userlist}
          </ul>
        </body>
      </html>
    );
  }
}

module.exports = Home;
