var React = require("react");

class Pokemon extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <div>
            <ul className="pokemon-list">
              <li className="pokemon-attribute">
                Id: {this.props.pokemon.id}
              </li>
              <li className="pokemon-attribute">
                Name: {this.props.pokemon.name}
              </li>
              <li className="pokemon-attribute">
                <img src={this.props.pokemon.img}/>
              </li>
              <li className="pokemon-attribute">
                Height: {this.props.pokemon.height}
              </li>
              <li className="pokemon-attribute">
                Weight: {this.props.pokemon.weight}
              </li>
              <p/>
              <form method="POST" action='/user/1'>
                <input name='id' value={this.props.pokemon.id} type="hidden"/>
                <input type="submit" value="Catch pokemon"/>
              </form>
              <p/>
              <form method="GET" action='/pokemon'>
                <input type="submit" value="Back"/>
              </form>
            </ul>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Pokemon;
