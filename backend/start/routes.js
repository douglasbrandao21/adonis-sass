"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

/**
 * Rota para nova sessão de usuário
 */
Route.post("sessions", "SessionController.store");

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});

Route.group(() => {
  //O método apiOnly fará com que sejam considerados apenas os métodos padrões
  //de uma API Rest, ou seja:
  //Index(GET)
  //Store(POST)
  //Show(GET)
  //Update(PUT)
  //Destroy(DELETE)
  Route.resource("teams", "TeamController").apiOnly();
}).middleware("auth");
