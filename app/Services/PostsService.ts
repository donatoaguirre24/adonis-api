import Post from 'App/Models/Post'
import PostsInterface from 'Contracts/interfaces/PostsInterface'

export default class PostsService implements PostsInterface {
  public async create ({ title, content }) {
    try {
      return await Post.create({ title, content })
    } catch (error) {
      throw new Error(error)
    }
  }

  public async getAll () {
    try {
      return await Post.all()
    } catch (error) {
      throw new Error(error)
    }
  }

  public async getOne ({ id }) {
    try {
      return await Post.findOrFail(id)
    } catch (error) {
      throw new Error(error)
    }
  }

  public async update ({ id, title, content }) {
    try {
      const post = await Post.findOrFail(id)

      if (title) {
        post.title = title
      }

      if (content) {
        post.content = content
      }

      return await post.save()
    } catch (error) {
      throw new Error(error)
    }
  }

  public async delete ({ id }) {
    try {
      const post = await Post.find(id)
      await post?.delete()
    } catch (error) {
      throw new Error(error)
    }
  }
}
