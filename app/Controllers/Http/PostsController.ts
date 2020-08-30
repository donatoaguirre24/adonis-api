import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import PostValidator from 'App/Validators/PostValidator'

export default class PostsController {
  public async store ({ request, response }: HttpContextContract) {
    const { title, content } = await request.validate(PostValidator)
    const post = await Post.create({ title, content })
    return response.status(201).send({ post })
  }

  public async index ({ request, response }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 20)
    const posts = await Post.query().paginate(page, limit)
    return response.ok(posts)
  }

  public async show ({ params, response }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    return response.ok({ post })
  }

  public async update ({ params, request, response }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    post.merge(request.only(['title', 'content']))
    await post.save()
    return response.ok({ post })
  }

  public async destroy ({ params, response }: HttpContextContract) {
    const post = await Post.find(params.id)
    await post?.delete()
    return response.noContent()
  }
}
