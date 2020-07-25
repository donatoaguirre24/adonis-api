import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

export default class HealthController {
  public async index ({ response }: HttpContextContract) {
    try {
      const report = await HealthCheck.getReport()
      return response.ok(report)
    } catch (error) {
      return response.status(500).send(error.messages)
    }
  }
}
