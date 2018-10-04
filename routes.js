var routes = (app, pool) => {
	const userFunctions = require('./controller/user')(pool);
	const pokemonFunctions = require('./controller/pokemon')(pool);

	app.get('/user', userFunctions.getUserRoot);
	app.get('/user/new', userFunctions.getNewUser);
	app.get('/user/:id', userFunctions.getUser);

	app.post('/user/login', userFunctions.userLogin);
	app.post('/user', userFunctions.postUser);

	app.get('/pokemon', pokemonFunctions.getRoot);

	app.get('/pokemon/:id/edit', pokemonFunctions.editPokemonForm);
	app.get('/pokemon/new', pokemonFunctions.getNew);
	app.get('/pokemon/:id', pokemonFunctions.getPokemon);
	app.post('/pokemon', pokemonFunctions.postPokemon);

	app.put('/pokemon/:id', pokemonFunctions.updatePokemon);
	app.post('/user/1', pokemonFunctions.catchPokemon);

}

module.exports = routes;