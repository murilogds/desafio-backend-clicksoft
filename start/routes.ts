import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('/alunos', 'AlunosController.index')
Route.post('/alunos', 'AlunosController.store')
Route.get('/alunos/:id', 'AlunosController.show')
Route.put('/alunos/:id', 'AlunosController.update')
Route.delete('/alunos/:id', 'AlunosController.destroy')
