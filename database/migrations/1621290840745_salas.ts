import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Salas extends BaseSchema {
  protected tableName = 'salas'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('numero_sala')
      table.integer('capacidade')
      table.boolean('disponibilidade')
      table.integer('professor_id').unsigned().references('professors.id').onDelete('CASCADE')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
