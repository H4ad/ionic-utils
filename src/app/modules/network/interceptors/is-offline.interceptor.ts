//#region Imports

import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';

import { NetworkService } from '../services/network.service';

//#endregion

/**
 * A classe que representa o interceptor que adiciona um url base para todas as requisições
 */
@Injectable()
export class IsOfflineInterceptor implements HttpInterceptor {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    @Optional()
    private readonly network: NetworkService,
  ) { }

  //#endregion

  //#region Public Methods

  /**
   * Método que é executado para interceptar a requisição e realizar alguma operação
   */
  public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.network) {
      console.error('Você está utilizando o Interceptor de Network mas esqueceu de importar o módulo de Network.');

      return next.handle(req);
    }

    if (this.network.isOnline())
      return next.handle(req);

    throw new HttpErrorResponse({
      status: 503,
      error: new Error('Por favor, verifique se você realmente está conectado a internet.'),
    });
  }

  //#endregion

}
