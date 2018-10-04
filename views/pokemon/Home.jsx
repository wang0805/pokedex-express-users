var React = require("react");

class Home extends React.Component {
  render() {

    let pokelist = this.props.pokemon.map(pokemon => {
      let aTag = '/pokemon/'+pokemon.id;

      return (
        <li key={pokemon.id}>
          <a href={aTag}>{pokemon.name}</a>
        </li> 
      )
    })
    let actionUrl = '/user/'+this.props.userid;

    return (
      <html>
        <head />
        <body>
          <h1>Welcome to Pokedex</h1>
          <form method="GET" action={actionUrl}>
            <input type="submit" value="Back"/>
          </form>
          <ul>
            {pokelist}
          </ul>

        </body>
      </html>
    );
  }
}

module.exports = Home;
