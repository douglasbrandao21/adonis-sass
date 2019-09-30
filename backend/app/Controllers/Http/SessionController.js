"use strict";

class SessionController {
  /**
   * Faz a validação de uma nova sessão por meio do email e senha fornecidos pelo
   * usuário através de requisição.
   * @param request requisição http
   * @param auth objeto de autenticação
   * @return token criado para a sessão do usuário, caso a autenticação tenha sido
   * feita com sucesso.
   */
  async store({ request, auth }) {
    const { email, password } = request.all();

    /**
     * auth.attempt faz a verificação se o email e senha fornecidos na requisição
     * estão de acordos com o email e senha armazenados no banco de dados.
     * Se estiver, retorna um token. Caso contrário, dispara uma excessão.
     */
    const token = await auth.attempt(email, password);

    return token;
  }
}

module.exports = SessionController;
