var React = require("react");

class Home extends React.Component {
  render() {
    //console.log(this);
    let userlist = this.props.user.map(users => {

      return (
        <li key={users.id}>
          {users.name}
        </li> 
      )
    })


    return (
      <html>
        <head />
        <body>
          <h1>Welcome to Users</h1>
          <form method="POST" action ='/user/login'>
            <p>Username:</p>
            <input name="name" type="text" placeholder="enter username"/>
            <p>Password:</p>
            <input name="password" type="password" placeholder="enter password"/>
            <p></p>
            <input type="submit" value="login"/>
          </form>
          <p></p>
          <form method="GET" action='/user/new'>
            <input type="submit" value="Sign up"/>
          </form>
          <p></p>
          <h2>List of users for reference</h2>
          <ul>
            {userlist}
          </ul>
        </body>
      </html>
    );
  }
}

module.exports = Home;
