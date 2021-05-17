import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Sala from './Sala'

export default class Professor extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public nome: string

  @column()
  public email: string

  @column()
  public matricula: string

  @column()
  public nascimento: Date

  @hasMany(() => Sala)
  public salas: HasMany<typeof Sala>
}
