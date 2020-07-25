import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'

export default class PostValidator {
  constructor (private ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string({}, [
      rules.unique({ table: 'posts', column: 'title' }),
    ]),
    content: schema.string(),
  })

  public cacheKey = this.ctx.routeKey

  public messages = {
    required: 'The {{ field }} field is required to create a Post',
    unique: 'The post {{ field }} is already in use',
  }
}
