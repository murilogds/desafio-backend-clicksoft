import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('/alunos', 'AlunosController.index')
Route.post('/alunos', 'AlunosController.store')
Route.get('/alunos/:id', 'AlunosController.show')
Route.put('/alunos/:id', 'AlunosController.update')
Route.delete('/alunos/:id', 'AlunosController.destroy')

Route.get('/professores', 'ProfessoresController.index')
Route.post('/professores', 'ProfessoresController.store')
Route.get('/professores/:id', 'ProfessoresController.show')
Route.put('/professores/:id', 'ProfessoresController.update')
Route.delete('/professores/:id', 'ProfessoresController.destroy')
