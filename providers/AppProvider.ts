import { IocContract } from '@adonisjs/fold'
import PostsService from 'App/Services/PostsService'

export default class AppProvider {
  constructor (protected $container: IocContract) {}

  public register () {
    // Register your own bindings
    this.$container.singleton('PostsService', () => new PostsService())
  }

  public boot () {
    // IoC container is ready
  }

  public shutdown () {
    // Cleanup, since app is going down
  }

  public ready () {
    // App is ready
  }
}
