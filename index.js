/**
 * To-do for homework on 28 Jun 2018
 * =================================
 * 1. Create the relevant tables.sql file
 * 2. New routes for user-creation
 * 3. Change the pokemon form to add an input for user id such that the pokemon belongs to the user with that id
 * 4. (FURTHER) Add a drop-down menu of all users on the pokemon form
 * 5. (FURTHER) Add a types table and a pokemon-types table in your database, and create a seed.sql file inserting relevant data for these 2 tables. Note that a pokemon can have many types, and a type can have many pokemons.
 */
const sha256 = require('js-sha256');
const cookieParser = require('cookie-parser');
const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const config = {
  user: 'wangwh',
  host: '127.0.0.1',
  database: 'pokemons',
  port: 5432,
};

if (config.user === 'ck') {
	throw new Error("====== UPDATE YOUR DATABASE CONFIGURATION =======");
};

const pool = new pg.Pool(config);

pool.on('error', function (err) {
  console.log('Idle client error', err.message, err.stack);
});

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

/**
 * ===================================
 * Route Handler Functions
 * ===================================
 */

const userLogin = (request, response) => {

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
}


const getUserRoot = (request, response) => {

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
}

 const getRoot = (request, response) => {
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
}

const getNew = (request, response) => {
  response.render('pokemon/new');
}

const getNewUser = (request, response) => {
  response.render('users/new');
}

const getPokemon = (request, response) => {
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
}

const getUser = (request, response) => {
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
}

const postPokemon = (request, response) => {
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
};

//how to make this more dynamic for users 
const catchPokemon = (request, response) => {
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
}

const postUser = (request, response) => {

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
};

const editPokemonForm = (request, response) => {
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
}

const updatePokemon = (request, response) => {
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

const deletePokemonForm = (request, response) => {
  response.send("COMPLETE ME");
}

const deletePokemon = (request, response) => {
  response.send("COMPLETE ME");
}
/**
 * ===================================
 * User
 * ===================================
 */


const userNew = (request, response) => {
  response.render('users/new');
}

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/pokemon', getRoot);
app.get('/user', getUserRoot);

app.get('/pokemon/:id/edit', editPokemonForm);
app.get('/pokemon/new', getNew);
app.get('/user/new', getNewUser);
app.get('/pokemon/:id', getPokemon);
app.get('/user/:id', getUser);
app.get('/pokemon/:id/delete', deletePokemonForm);

app.post('/user/login', userLogin);
app.post('/pokemon', postPokemon);
app.post('/user', postUser);

app.put('/pokemon/:id', updatePokemon);

app.delete('/pokemon/:id', deletePokemon);

// TODO: New routes for creating users

app.get('/users/new', userNew);
app.post('/user/1', catchPokemon);

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Ahoy we go from the port of 3000!!!'));



// Handles CTRL-C shutdown
function shutDown() {
  console.log('Recalling all ships to harbour...');
  server.close(() => {
    console.log('... all ships returned...');
    pool.end(() => {
      console.log('... all loot turned in!');
      process.exit(0);
    });
  });
};

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);


