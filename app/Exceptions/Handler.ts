import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import Logger from '@ioc:Adonis/Core/Logger'

export default class ExceptionHandler extends HttpExceptionHandler {
  protected ignoreCodes = [
    'E_ROUTE_NOT_FOUND',
  ]

  protected ignoreStatuses = [
    400,
    401,
    422,
  ]

  constructor () {
    super(Logger)
  }
}
