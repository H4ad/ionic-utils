//#region Imports

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpAsyncConfig } from '../models/http-async.config';
import { HTTP_ASYNC_CONFIG } from '../models/injection-tokens';

//#endregion

/**
 * A classe que representa o interceptor que adiciona o header de Authorization para todas as requisições
 */
@Injectable()
export class BearerTokenInterceptor implements HttpInterceptor {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    @Inject(HTTP_ASYNC_CONFIG)
    @Optional()
    protected readonly config?: HttpAsyncConfig,
  ) { }

  //#endregion

  //#region Public Methods

  /**
   * Método que é executado para interceptar a requisição e realizar alguma operação
   */
  public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.config?.bearerTokenKey) {
      console.warn('Você incluiu o Interceptor para adicionar o Bearer Token a requisição mas não configurou a chave para buscar o valor do cache no módulo.');

      return next.handle(req);
    }

    const bearerToken = localStorage.getItem(this.config.bearerTokenKey);

    if (!bearerToken)
      return next.handle(req);

    const headers = req.headers.set('Authorization', bearerToken);

    req = req.clone({
      headers,
    });

    return next.handle(req);
  }

  //#endregion

}
