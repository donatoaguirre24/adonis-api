import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import PostValidator from 'App/Validators/PostValidator'

export default class PostsController {
  public async store ({ request, response }: HttpContextContract) {
    try {
      const { title, content } = await request.validate(PostValidator)
      const post = await Post.create({ title, content })
      return response.status(201).send({ post })
    } catch (error) {
      return response.status(422).send(error.messages)
    }
  }

  public async index ({ response }: HttpContextContract) {
    try {
      const posts = await Post.all()
      return response.ok({ posts })
    } catch (error) {
      return response.status(500)
    }
  }

  public async show ({ params, response }: HttpContextContract) {
    try {
      const post = await Post.findOrFail(params.id)
      return response.ok({ post })
    } catch (error) {
      return response.status(404)
    }
  }

  public async update ({ params, request, response }: HttpContextContract) {
    try {
      const { content, title } = request.only(['title', 'content'])

      const post = await Post.findOrFail(params.id)

      if (title) {
        post.title = title
      }

      if (content) {
        post.content = content
      }

      await post.save()

      return response.ok({ post })
    } catch (error) {
      return response.status(500)
    }
  }

  public async destroy ({ params, response }: HttpContextContract) {
    try {
      const post = await Post.find(params.id)
      await post?.delete()
      return response.status(204)
    } catch (error) {
      return response.status(500)
    }
  }
}
