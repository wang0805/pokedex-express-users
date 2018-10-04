var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <form method="POST" action="/user">
            <div>
              <p>name: </p>
              <input name="name" type="text" />
              <p>password: </p>
              <input name="password" type="text"/>
            </div>
            <p></p>
            <input type="submit" value="Submit" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = New;
