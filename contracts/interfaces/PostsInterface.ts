import Post from 'App/Models/Post'

export default interface PostsInterface {
  create({ title, content }): Promise<Post>

  getAll(): Promise<Post[]>

  getOne({ id }): Promise<Post>

  update({ id, title, content }): Promise<Post>

  delete({ id }): Promise<void>
}
