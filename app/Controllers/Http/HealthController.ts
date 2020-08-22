import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HealthController {
  public async index ({ response }: HttpContextContract) {
    const report = await HealthCheck.getReport()

    return report.healthy
      ? response.ok(report)
      : response.badRequest(report)
  }
}
