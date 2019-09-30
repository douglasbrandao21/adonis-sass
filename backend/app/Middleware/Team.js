/**
 * @author Douglas Brandão
 */

"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Middleware para buscar do header de cada requisição qual time está ativo.
 */
class Team {
  /**
   * @param request objeto de requisição
   * @param response objeto de resposta
   * @param auth objeto de autenticação
   * @return 401 caso não haja nenhum time com o slug correspondente ao especificado
   * no header da requisição
   * @return time, caso o time especificado no header da requisição seja encontrado
   */
  async handle({ request, response, auth }, next) {
    //Recupear o slug do time buscado do header chamado TEAM da requisição
    const slug = request.header("TEAM");

    let team = null;

    //Caso o valor de slug enviado no header da requisição exista, buscamos um
    //time correspondente ao mesmo
    if (slug) {
      team = await auth.user.teams("slug", slug).first();
    }

    //Caso este time não exista, retornamos um erro 401
    if (!team) {
      return response.status(401).send();
    }

    //Caso exista, vamos armazenar as informações deste time em variáveis importantes
    //como, em user.currentTeam e em request.team
    auth.user.currentTeam = team.id;
    request.team = team;

    await next();
  }
}

module.exports = Team;
