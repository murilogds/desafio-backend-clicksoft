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

    const professorExistsByMatricula = await Professor.findBy('matricula', data.matricula)
    const professorExistsByEmail = await Professor.findBy('email', data.email)

    if (professorExistsByMatricula) {
      throw new Error(
        'Já existe um professor cadastrado com essa matrícula, tente com outra matrícula.'
      )
    } else if (professorExistsByEmail) {
      throw new Error('Já existe um professor cadastrado com esse email, tente com outro email.')
    }

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
    try {
      const professor = await Professor.findOrFail(params.id)

      return {
        id: professor.id,
        nome: professor.nome,
        nascimento: professor.nascimento,
        email: professor.email,
        matricula: professor.matricula,
      }
    } catch (error) {
      throw new Error(
        'Não foi possível encontrar o professor com o id fornecido, verifique se o id fornecido é válido'
      )
    }
  }

  public async update({ request, params }: HttpContextContract) {
    try {
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
    } catch (error) {
      throw new Error(
        'Não foi possível atualizar o professor com o id fornecido, verifique se o id fornecido é válido'
      )
    }
  }

  public async destroy({ params }: HttpContextContract) {
    try {
      const professor = await Professor.findOrFail(params.id)

      await professor.delete()

      return { message: 'Professor deletado com sucesso' }
    } catch (error) {
      throw new Error(
        'Não foi possível encontrar o professor com o id fornecido, verifique se o id fornecido é válido'
      )
    }
  }
}
