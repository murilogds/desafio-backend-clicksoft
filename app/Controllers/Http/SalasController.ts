import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Aluno from 'App/Models/Aluno'
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

    const professor = await Professor.findBy('matricula', data.matricula_professor)

    if (!professor) {
      throw new Error(
        'Não existe professor com a matrícula fornecida, não foi possível cadastrar a sala.'
      )
    }

    const sala = await Sala.create({
      numero_sala: data.numero_sala,
      capacidade: data.capacidade,
      disponibilidade: data.disponibilidade,
    })

    await sala.related('professor').associate(professor)

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

  public async show({ params }: HttpContextContract) {
    try {
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
    } catch (error) {
      throw new Error(
        'Não foi possível encontrar a sala com o id fornecido, verifique se o id fornecido é válido'
      )
    }
  }

  public async update({ request, params }: HttpContextContract) {
    try {
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
    } catch (error) {
      throw new Error(
        'Não foi possível atualizar a sala com o id fornecido, verifique se o id fornecido é válido'
      )
    }
  }

  public async destroy({ params }: HttpContextContract) {
    try {
      const sala = await Sala.findOrFail(params.id)
      await sala.delete()

      return { message: 'Sala deletada com sucesso' }
    } catch (error) {
      throw new Error(
        'Não foi possível deletar a sala com o id fornecido, verifique se o id fornecido é válido'
      )
    }
  }

  public async storeStudent({ request, params }: HttpContextContract) {
    const { matriculaProfessor, matriculaAluno } = request.only([
      'matriculaProfessor',
      'matriculaAluno',
    ])

    const sala = await Sala.find(params.id)

    if (!sala) {
      throw new Error('Não existe nenhuma sala com o id fornecido')
    }

    const aluno = await Aluno.findBy('matricula', matriculaAluno)

    if (!aluno) {
      throw new Error('Não existe nenhum aluno com a matrícula fornecida')
    }

    await sala.preload('alunos')

    await sala.preload('professor')

    await sala.preload('alunos')

    if (sala.professor.matricula !== matriculaProfessor) {
      throw new Error(
        'A matrícula do professor informada é diferente da informada no cadastro da sala'
      )
    }

    if (sala.disponibilidade === false) {
      throw new Error('Essa sala está cheia')
    }

    if (sala.alunos.find((alunoAux) => alunoAux.matricula === matriculaAluno)) {
      throw new Error('Aluno já está cadastrado nessa sala')
    }

    await sala.related('alunos').attach([aluno.id])

    await sala.preload('alunos')

    if (sala.alunos.length === sala.capacidade) {
      sala.disponibilidade = false
      await sala.save()
    }

    return { message: 'Aluno alocado na sala com sucesso' }
  }

  public async deleteStudent({ request, params }: HttpContextContract) {
    const { matriculaProfessor, matriculaAluno } = request.only([
      'matriculaProfessor',
      'matriculaAluno',
    ])

    const sala = await Sala.find(params.id)

    if (!sala) {
      throw new Error('Não existe nenhuma sala com o id fornecido')
    }

    const aluno = await Aluno.findBy('matricula', matriculaAluno)

    if (!aluno) {
      throw new Error('Não existe nenhum aluno com a matrícula fornecida')
    }

    await sala.preload('alunos')

    await sala.preload('professor')

    await sala.preload('alunos')

    if (sala.professor.matricula !== matriculaProfessor) {
      throw new Error(
        'A matrícula do professor informada é diferente da informada no cadastro da sala'
      )
    }

    if (!sala.alunos.find((alunoAux) => alunoAux.matricula === matriculaAluno)) {
      throw new Error('Este aluno não está cadastrado nessa sala')
    }

    await sala.related('alunos').detach([aluno.id])

    if (sala.disponibilidade === false) {
      sala.disponibilidade = true
      await sala.save()
    }

    await sala.preload('alunos')

    return { message: 'Aluno removido da sala com sucesso' }
  }

  public async showStudents({ params }: HttpContextContract) {
    try {
      const sala = await Sala.findOrFail(params.id)

      await sala.preload('alunos')

      return {
        id: sala.id,
        sala: sala.numero_sala,
        capacidade: sala.capacidade,
        disponibilidade: sala.disponibilidade,
        alunos: sala.alunos.map((aluno) => {
          return {
            id: aluno.id,
            nome: aluno.nome,
            email: aluno.email,
            matricula: aluno.matricula,
            nascimento: aluno.nascimento,
          }
        }),
      }
    } catch (error) {
      throw new Error(
        'Não foi possível encontrar a sala com o id fornecido, verifique se o id fornecido é válido'
      )
    }
  }
}
