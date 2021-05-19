import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Aluno from 'App/Models/Aluno'

export default class AlunosController {
  public async index({}: HttpContextContract) {
    const alunos = await Aluno.all()

    return alunos
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only(['nome', 'email', 'matricula', 'nascimento'])
    const aluno = await Aluno.create(data)

    return aluno
  }

  public async show({ params }: HttpContextContract) {
    const aluno = await Aluno.findOrFail(params.id)

    return aluno
  }

  public async update({ request, params }: HttpContextContract) {
    const aluno = await Aluno.findOrFail(params.id)
    const data = request.only(['nome', 'email', 'matricula', 'nascimento'])

    aluno.merge(data)

    await aluno.save()

    return aluno
  }

  public async destroy({ params }: HttpContextContract) {
    const aluno = await Aluno.findOrFail(params.id)

    await aluno.delete()

    return { message: 'Aluno deletado com sucesso' }
  }

  public async showClasses({ params }: HttpContextContract) {
    const aluno = await Aluno.findOrFail(params.id)

    const salas = await aluno.related('salas').query().preload('professor')
    return {
      aluno: aluno.nome,
      salas: salas.map((sala) => {
        return { sala: sala.numero_sala, professor: sala.professor.nome }
      }),
    }
  }
}
