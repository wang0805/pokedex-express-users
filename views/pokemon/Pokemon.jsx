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
                id: {this.props.pokemon.id}
              </li>
              <li className="pokemon-attribute">
                name: {this.props.pokemon.name}
              </li>
              <li className="pokemon-attribute">
                <img src={this.props.pokemon.img}/>
              </li>
              <li className="pokemon-attribute">
                height: {this.props.pokemon.height}
              </li>
              <li className="pokemon-attribute">
                weight: {this.props.pokemon.weight}
              </li>
              <form method="POST" action='/user/1'>
                <input name='id' value={this.props.pokemon.id} type="hidden"/>
                <input type="submit" value="user 1 catch pokemon"/>
              </form>
            </ul>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Pokemon;
