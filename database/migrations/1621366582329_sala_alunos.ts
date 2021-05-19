import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SalaAlunos extends BaseSchema {
  protected tableName = 'sala_aluno'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('sala_id').unsigned().references('salas.id')
      table.integer('aluno_id').unsigned().references('alunos.id')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
