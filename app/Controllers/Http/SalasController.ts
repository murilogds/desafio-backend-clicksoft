import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Professor from 'App/Models/Professor'
import Sala from 'App/Models/Sala'

export default class SalasController {
  public async index({}: HttpContextContract) {
    const salas = await Sala.query().preload('professor')

    return salas.map((sala) => {
      return {
        id: sala.id,
        numero_sala: sala.numero_sala,
        capacidade: sala.capacidade,
        disponibilidade: sala.disponibilidade,
        professor: {
          id: sala.professor.id,
          nome: sala.professor.nome,
          matricula: sala.professor.matricula,
          email: sala.professor.email,
          nascimento: sala.professor.nascimento,
        },
      }
    })
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only([
      'matricula_professor',
      'numero_sala',
      'capacidade',
      'disponibilidade',
    ])
    const professor = await Professor.findByOrFail('matricula', data.matricula_professor)

    const sala = await Sala.create({
      numero_sala: data.numero_sala,
      capacidade: data.capacidade,
      disponibilidade: data.disponibilidade,
    })

    await sala.related('professor').associate(professor)

    return {
      id: sala.id,
      numero_sala: sala.numero_sala,
      capacidade: sala.capacidade,
      disponibilidade: sala.disponibilidade,
      professor: {
        id: sala.professor.id,
        nome: sala.professor.nome,
        matricula: sala.professor.matricula,
        email: sala.professor.email,
        nascimento: sala.professor.nascimento,
      },
    }
  }

  public async show({ params }: HttpContextContract) {
    const sala = await Sala.findOrFail(params.id)

    await sala.preload('professor')

    return {
      id: sala.id,
      numero_sala: sala.numero_sala,
      capacidade: sala.capacidade,
      disponibilidade: sala.disponibilidade,
      professor: {
        id: sala.professor.id,
        nome: sala.professor.nome,
        matricula: sala.professor.matricula,
        email: sala.professor.email,
        nascimento: sala.professor.nascimento,
      },
    }
  }

  public async update({ request, params }: HttpContextContract) {
    const sala = await Sala.findOrFail(params.id)
    const data = request.only(['numero_sala', 'capacidade', 'disponibilidade'])

    sala.merge(data)
    await sala.save()

    await sala.preload('professor')

    return {
      id: sala.id,
      numero_sala: sala.numero_sala,
      capacidade: sala.capacidade,
      disponibilidade: sala.disponibilidade,
      professor: {
        id: sala.professor.id,
        nome: sala.professor.nome,
        matricula: sala.professor.matricula,
        email: sala.professor.email,
        nascimento: sala.professor.nascimento,
      },
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const sala = await Sala.findOrFail(params.id)
    await sala.delete()

    return { message: 'Sala deletada com sucesso' }
  }
}
