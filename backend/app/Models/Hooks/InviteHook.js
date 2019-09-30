/**
 * @author Douglas Brandão
 */
"use strict";

const InviteHook = (exports = module.exports = {});

const User = use("App/Models/User");

/**
 * Hook utilizado para que sempre que houver determinada ação no model de Invite,
 * adicinar pessoas a um time, ou, caso o usuário não tenha cadastro, enviar email
 * notificando do convite e solicitando para criação de conta
 */
InviteHook.sendInvitationEmail = async invite => {
  //Recupeara o email do objeto de Invite
  const { email } = invite;

  //Tentamos buscar um usuário com o e-mail a pouco recuperado
  const userInvited = await User.findBy("email", email);

  //Caso este usuário exista, ou seja, esteja cadastrado, este será adicionado ao
  //time ativo do usuário logado.
  if (userInvited) {
    await invited.teams().attach(invite.team_id);
  }
  //Caso contrário, enviaremos um e-mail ao usuário solicitando que o mesmo realize
  //seu cadastro para que possa fazer parte do tie.
  else {
    console.log("Criar conta");
  }
};
