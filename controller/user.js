var sha256 = require('js-sha256');

module.exports = (pool) => {
	return {
		//does it make a difference if an object key is "" or not?
		userLogin: (request, response) => {

		  let name = request.body.name;

		  const queryString = `SELECT * FROM users WHERE name='${name}'`;

		  pool.query(queryString, (err, result) => {
		    if (err) {
		      console.error('Query error:', err.stack);
		    } else if(result.rows[0]!=null){
		        console.log("query result", result.rows);
		        if(sha256(request.body.password) === result.rows[0].password){

		          response.cookie('logged_in', 'true');
		          response.cookie('user_id', result.rows[0].id);
		          // redirect to home page
		          let redirectUrl = '/user/'+result.rows[0].id;
		          response.redirect(redirectUrl);
		        } else {response.send("Wrong Password");}
		    }
		    else {response.send("No such user");}
		  });
		},

		getUserRoot: (request, response) => {

		  //clear cookies first
		  response.clearCookie('user_id');
		  response.clearCookie('logged_in');

		  const queryString = 'SELECT * from users';

		  pool.query(queryString, (err, result) => {
		    if (err) {
		      console.error('Query error:', err.stack);
		    } else {
		      //console.log('Query result:', result.rows);

		      // redirect to home page
		      response.render( 'users/home', {user: result.rows} );
		    }
		  });
		},

		getNewUser: (request, response) => {
		  response.render('users/new');
		},

		getUser: (request, response) => {
		  console.log(request.params);
		  let id = parseInt(request.cookies['user_id']);
		  
		  //use ` something ` to split the txt
		  const queryString = `SELECT users.name AS trainername, pokemon.name AS pokemonname
		  FROM pokemon 
		  INNER JOIN users_pokemon ON (users_pokemon.pokemon_id = pokemon.id) 
		  INNER JOIN users ON (users_pokemon.users_id = users.id) 
		  WHERE users_pokemon.users_id=${id};`;

		  pool.query(queryString, (err, result) => {
		    if (err) {
		      console.error('Query error:', err.stack);
		    } else {
		      console.log('Query result:', result.rows);

		      // redirect to home page
		      response.render( 'users/user', {user: result.rows} );
		    }
		  });
		},

		userNew: (request, response) => {
		  response.render('users/new');
		},

		postUser: (request, response) => {

		  let name = request.body.name;
		  let hash = sha256(request.body.password);
		  
		  const queryString = 'INSERT INTO users(name, password) VALUES($1, $2);';
		  const values = [name, hash];

		  pool.query(queryString, values, (err, result) => {
		    if (err) {
		      console.log('query error:', err.stack);
		    } else {
		      //console.log('query result:', result);

		      // redirect to home page
		      response.redirect('/user');
		    }
		  });
		}

		
	}
}