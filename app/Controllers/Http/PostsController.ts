import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PostsService from '@ioc:PostsService'
import PostValidator from 'App/Validators/PostValidator'

export default class PostsController {
  public async store ({ request, response }: HttpContextContract) {
    try {
      const postData = await request.validate(PostValidator)
      const post = await PostsService.create(postData)
      return response.status(201).send({ post })
    } catch (error) {
      return response.status(422).send(error.messages)
    }
  }

  public async index ({ response }: HttpContextContract) {
    try {
      const posts = await PostsService.getAll()
      return response.ok({ posts })
    } catch (error) {
      return response.status(500)
    }
  }

  public async show ({ params, response }: HttpContextContract) {
    try {
      const post = await PostsService.getOne({ id: params.id })
      return response.ok({ post })
    } catch (error) {
      return response.status(404)
    }
  }

  public async update ({ params, request, response }: HttpContextContract) {
    try {
      const { content, title } = request.only(['title', 'content'])
      const post = await PostsService.update({ id: params.id, title, content })
      return response.ok({ post })
    } catch (error) {
      return response.status(500)
    }
  }

  public async destroy ({ params, response }: HttpContextContract) {
    try {
      await PostsService.delete({ id: params.id })
      return response.status(204)
    } catch (error) {
      return response.status(500)
    }
  }
}
