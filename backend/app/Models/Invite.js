"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Invite extends Model {
  static boot() {
    super.boot();

    //Depois da criação de um novo Invite, disparamos o hook sendInvitationEmail
    this.addHook("afterCreate", "InviteHook.sendInvitationEmail");
  }

  /**
   * Definindo o relacionamento de User - Invite
   * Este usuário é o que receberá o convite para participar do time.
   * Portando, a relação user - invite é 1:N.
   */
  user() {
    return this.belongsTo("App/Models/User");
  }

  team() {
    return this.belongsTo("App/Models/Team");
  }
}

module.exports = Invite;
