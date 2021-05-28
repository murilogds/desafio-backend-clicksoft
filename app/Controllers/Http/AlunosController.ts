import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Aluno from 'App/Models/Aluno'

export default class AlunosController {
  public async index({}: HttpContextContract) {
    const alunos = await Aluno.all()

    return alunos.map((aluno) => {
      return {
        id: aluno.id,
        nome: aluno.nome,
        email: aluno.email,
        matricula: aluno.matricula,
      }
    })
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only(['nome', 'email', 'matricula', 'nascimento'])

    const alunoExistsByMatricula = await Aluno.findBy('matricula', data.matricula)
    const alunoExistsByEmail = await Aluno.findBy('email', data.email)

    if (alunoExistsByMatricula) {
      throw new Error('Já existe um aluno cadastrado com essa matrícula, tente com outra matrícula')
    } else if (alunoExistsByEmail) {
      throw new Error('Já existe um aluno cadastrado com esse email, tente com outro email')
    }

    const aluno = await Aluno.create(data)

    return {
      id: aluno.id,
      nome: aluno.nome,
      email: aluno.email,
      matricula: aluno.matricula,
    }
  }

  public async show({ params }: HttpContextContract) {
    try {
      const aluno = await Aluno.findOrFail(params.id)

      return {
        id: aluno.id,
        nome: aluno.nome,
        email: aluno.email,
        matricula: aluno.matricula,
      }
    } catch (error) {
      throw new Error(
        'Não foi possível encontrar o aluno com o id fornecido, verifique se o id fornecido é válido'
      )
    }
  }

  public async update({ request, params }: HttpContextContract) {
    try {
      const aluno = await Aluno.findOrFail(params.id)
      const data = request.only(['nome', 'email', 'matricula', 'nascimento'])

      aluno.merge(data)

      await aluno.save()

      return {
        id: aluno.id,
        nome: aluno.nome,
        email: aluno.email,
        matricula: aluno.matricula,
      }
    } catch (error) {
      throw new Error(
        'Não foi possível atualizar o aluno com o id fornecido, verifique se o id fornecido é válido'
      )
    }
  }

  public async destroy({ params }: HttpContextContract) {
    try {
      const aluno = await Aluno.findOrFail(params.id)

      await aluno.delete()
    } catch (error) {
      throw new Error(
        'Não foi possível deletar o aluno com o id fornecido, verifique se o id fornecido é válido'
      )
    }

    return { message: 'Aluno deletado com sucesso' }
  }

  public async showClasses({ params }: HttpContextContract) {
    let aluno: Aluno
    try {
      aluno = await Aluno.findOrFail(params.id)
    } catch (err) {
      throw new Error(
        'Não foi possível encontrar o aluno com o id fornecido, verifique se o id fornecido é válido'
      )
    }

    const salas = await aluno.related('salas').query().preload('professor')
    return {
      aluno: aluno.nome,
      salas: salas.map((sala) => {
        return { sala: sala.numero_sala, professor: sala.professor.nome }
      }),
    }
  }
}
