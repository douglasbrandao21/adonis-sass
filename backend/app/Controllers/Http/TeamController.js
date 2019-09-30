/**
 * @author Douglas Brandão
 */
"use strict";

/**
 * Resourceful controller for interacting with teams
 */
class TeamController {
  //=============================== Index ======================================
  /**
   * Método que exibe todos os times do usuário autenticado.
   * @param auth objeto de autenticação do Adonis
   * @return times a qual o usuário logado pertence.
   */
  async index({ auth }) {
    //Busca os times do usuário logado através do relacionamento a ele pertencente
    const teams = await auth.user.teams().fetch();

    return teams;
  }

  //============================== Store =======================================
  /**
   * Método para criação de um novo time.
   * @param request objeto da requisição para recuperação do nome do time.
   * @param auth objeto de autenticação da requisição
   * @return time criado
   */
  async store({ request, auth }) {
    //Recupera apenas a chave "name" do json da requisiçaõ
    const data = request.only(["name"]);

    //Criamos um novo time por meio do model de time presente no relacionamento
    //com o usuário logado.
    const team = await auth.user.teams().create({
      ...data,
      user_id: auth.user.id
    });

    return team;
  }

  //=============================== Show =======================================
  /**
   * Método que mostra determinado time de um usuário
   * @param params parâmetros enviados na URL da requisição
   * @param auth objeto de autenticação da requisição
   * @return time desejado
   */
  async show({ params, auth }) {
    //Buscamos o time onde, seu id seja igual ao id presente nos parametros
    //da URL de request
    const team = await auth.user
      .teams()
      .where("team.id", params.id)
      .first(); //Apenas o primeiro resultado da Query

    return team;
  }

  //============================== Update ======================================
  /**
   * Método que faz a atualização de um time
   * @param params parâmetros passados pela URL da requisição
   * @param request objeto de requisição
   * @param auth objeto de autenticão da requisição
   * @return time devidamente atualizado
   */
  async update({ params, request, auth }) {
    //Buscamos apenas a chave "name" do JSON de requisição
    const data = request.only(["name"]);

    //Fazemos uma query que busca o time relacionado com o usuário logado onde
    //o id deste time seja igual ao id especificado nos parâmetros da URL, ou seja
    //o time que queremos editar.
    const team = await auth.user
      .teams()
      .where("team_id", params.id)
      .first();

    //Damos um merge para inserir as novas informações no time buscado
    team.merge(data);

    //Salvamos nosso merge
    await team.save();

    return team;
  }

  //============================== Delete ======================================
  /**
   * Método que realiza a remoção de um time relacionado com o usuário logado
   * @param params parâmetros enviados pela URL da requisição
   * @param auth objeto de autenticação da requisição
   */
  async destroy({ params, auth }) {
    //Buscamos o time correto de acordo com o id especificado na URL da requisição
    const team = await auth.user
      .teams()
      .where("team_id", params.id)
      .first();

    //Deletamos o time buscado
    await team.delete();
  }
}

module.exports = TeamController;
