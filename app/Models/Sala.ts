import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Professor from './Professor'

export default class Sala extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public numero_sala: number

  @column()
  public capacidade: number

  @column()
  public disponibilidade: boolean

  @column()
  public professorId: number

  @belongsTo(() => Professor)
  public professor: BelongsTo<typeof Professor>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
