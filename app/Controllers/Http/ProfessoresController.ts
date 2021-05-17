import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Professor from 'App/Models/Professor'

export default class ProfessoresController {
  public async index({}: HttpContextContract) {
    const professores = await Professor.all()

    return professores.map((professor) => {
      return {
        id: professor.id,
        nome: professor.nome,
        nascimento: professor.nascimento,
        email: professor.email,
        matricula: professor.matricula,
      }
    })
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only(['nome', 'email', 'matricula', 'nascimento'])
    const professor = await Professor.create(data)

    return {
      id: professor.id,
      nome: professor.nome,
      nascimento: professor.nascimento,
      email: professor.email,
      matricula: professor.matricula,
    }
  }

  public async show({ params }: HttpContextContract) {
    const professor = await Professor.findOrFail(params.id)

    return {
      id: professor.id,
      nome: professor.nome,
      nascimento: professor.nascimento,
      email: professor.email,
      matricula: professor.matricula,
    }
  }

  public async update({ request, params }: HttpContextContract) {
    const data = request.only(['nome', 'email', 'matricula', 'nascimento'])
    const professor = await Professor.findOrFail(params.id)

    professor.merge(data)

    await professor.save()

    return {
      id: professor.id,
      nome: professor.nome,
      nascimento: professor.nascimento,
      email: professor.email,
      matricula: professor.matricula,
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const professor = await Professor.findOrFail(params.id)

    await professor.delete()

    return { message: 'Professor deletado com sucesso' }
  }
}
