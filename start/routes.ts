import Route from '@ioc:Adonis/Core/Route'

Route.get('health', 'HealthController.index')

Route.resource('posts', 'PostsController').apiOnly()
