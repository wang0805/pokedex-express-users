var React = require("react");

class Home extends React.Component {
  render() {
    //console.log(this);
    let pokelist = this.props.pokemon.map(pokemon => {
      let aTag = '/pokemon/'+pokemon.id;

      return (
        <li key={pokemon.id}>
          <a href={aTag}>{pokemon.name}</a>
        </li> 
      )
    })


    return (
      <html>
        <head />
        <body>
          <h1>Welcome to Pokedex</h1>
          <form method="GET" action='/pokemon/new'>
            <input type="submit" value="New"/>
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
