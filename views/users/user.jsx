var React = require("react");

class Home extends React.Component {
  render() {
    //console.log(this);
    let userlist = this.props.user.map(users => {

      return (
        <li>
          {users.pokemonname}
        </li> 
      )
    })

    let name = 'User';

    console.log(this.props.user); //return []
    console.log(this.props.user[0]) //return undefined <- can use this

    //using ! is quite dirty
    if (this.props.user[0]==undefined) {
      name = 'User';
    }
    else {
        name = this.props.user[0].trainername;
    } 

    console.log(name);

    return (
      <html>
        <head />
        <body>
          <h1>{name}</h1>
          <ul>
            {userlist}
          </ul>
          <form method="GET" action="/pokemon">
            <input type="submit" value="Go find pokemon"/>
          </form>
          <p/>
          <form method="GET" action="/user">
            <input type="submit" value="Log out"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Home;
