var sha256 = require('js-sha256');

module.exports = (pool) => {
	return {
		//does it make a difference if an object key is "" or not?
		getRoot: (request, response) => {
		  // query database for all pokemon

		  // respond with HTML page displaying all pokemon
		  //
		  let user_id = null;

		  if(request.cookies['user_id']!=undefined){
		    user_id = request.cookies['user_id'];
		  }

		  const queryString = 'SELECT * from pokemon;';
		  pool.query(queryString, (err, result) => {
		    if (err) {
		      console.error('Query error:', err.stack);
		    } else {
		      //console.log('Query result:', result);

		      // redirect to home page
		      response.render( 'pokemon/Home', {pokemon: result.rows, userid: user_id} );
		    }
		  });
		},


		getNew: (request, response) => {
		  response.render('pokemon/new');
		},

		getPokemon: (request, response) => {
		  let id = request.params['id'];
		  const queryString = 'SELECT * FROM pokemon WHERE id = ' + id + ';';
		  pool.query(queryString, (err, result) => {
		    if (err) {
		      console.error('Query error:', err.stack);
		    } else {
		     //console.log('Query result:', result.rows);

		      // redirect to home page
		      response.render( 'pokemon/Pokemon', {pokemon: result.rows[0]} );
		    }
		  });
		},

		postPokemon: (request, response) => {
		  let params = request.body;
		  
		  const queryString = 'INSERT INTO pokemon(name, img, weight, height) VALUES($1, $2, $3, $4);';
		  const values = [params.name, params.img, params.weight, params.height];

		  pool.query(queryString, values, (err, result) => {
		    if (err) {
		      console.log('query error:', err.stack);
		    } else {
		      //console.log('query result:', result);

		      // redirect to home page
		      response.redirect('/');
		    }
		  });
		},

		catchPokemon: (request, response) => {
		  console.log(request.cookies['user_id'])
		  console.log(typeof request.cookies['user_id']);

		  let params = request.body.id;
		  let id = parseInt(request.cookies['user_id']);

		  const queryString = 'INSERT INTO users_pokemon(pokemon_id, users_id) VALUES ($1, $2);';

		  let values =[params, id];

		  pool.query(queryString, values, (err, result) => {
		    if (err) {
		      console.log('query error:', err.stack);
		    } else {
		      //console.log('query result:', result);

		      // redirect to home page
		      response.redirect('/user/1');
		    }
		  });
		},

		editPokemonForm: (request, response) => {
		  let id = request.params['id'];
		  const queryString = 'SELECT * FROM pokemon WHERE id = ' + id + ';';
		  pool.query(queryString, (err, result) => {
		    if (err) {
		      console.error('Query error:', err.stack);
		    } else {
		      console.log('Query result:', result);

		      // redirect to home page
		      response.render( 'pokemon/Edit', {pokemon: result.rows[0]} );
		    }
		  });
		},

		updatePokemon: (request, response) => {
		  let id = request.params['id'];
		  let pokemon = request.body;
		  const queryString = 'UPDATE "pokemon" SET "num"=($1), "name"=($2), "img"=($3), "height"=($4), "weight"=($5) WHERE "id"=($6)';
		  const values = [pokemon.num, pokemon.name, pokemon.img, pokemon.height, pokemon.weight, id];
		  console.log(queryString);
		  pool.query(queryString, values, (err, result) => {
		    if (err) {
		      console.error('Query error:', err.stack);
		    } else {
		      console.log('Query result:', result);

		      // redirect to home page
		      response.redirect('/');
		    }
		  });
		}


	}
}