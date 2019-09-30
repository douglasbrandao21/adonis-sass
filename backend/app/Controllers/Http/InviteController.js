/**
 * @author Douglas Brandão
 */
"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Invite = use("App/Models/Invite");

/**
 * Resourceful controller for interacting with invites
 */
class InviteController {
  /**
   * Método responsável por criar e armazenar novos invites
   * @param request objeto de requisição
   * @param auth objeto de autenticação
   */
  async store({ request, auth }) {
    //Recuperamos apenas a chave "invites" do JSON de requisição
    const invites = request.input("invites");

    //Para cada elemento do array presente no JSON da requisição, criaremos uma
    //novo objeto de Invite com os devidos valores, e o adicionamos a um vetor,
    //posteriormete atribuido a data.
    const data = invites.map(email => ({
      email,
      user_id: auth.user.id,
      team_id: request.team.id
    }));

    //Persistimos no banco de dados todos os elementos do vetor de invites montado
    await Invite.createMany(data);
  }
}

module.exports = InviteController;
