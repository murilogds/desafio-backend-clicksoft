import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Alunos extends BaseSchema {
  protected tableName = 'alunos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nome')
      table.string('email')
      table.string('matricula')
      table.date('nascimento')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
