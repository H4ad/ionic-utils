//#region Imports

import { Component, Inject, Optional } from '@angular/core';

import { HttpAsyncConfig } from '../../modules/http-async/models/http-async.config';
import { HTTP_ASYNC_CONFIG } from '../../modules/http-async/models/injection-tokens';
import { HttpAsyncService } from '../../modules/http-async/services/http-async.service';

//#endregion

/**
 * A classe que representa o componente de teste que realiza algumas requisições
 */
@Component({
  selector: 'app-test-http-async-two',
  template: `
    <div class="test">
      <h1>Testar requisição - Componente - 2</h1>
      <p>Url Base: {{ httpConfig?.baseUrl }}</p>
      <p>Bearer Token Key: {{ httpConfig?.bearerTokenKey }}</p>
      <p>Default Headers: {{ httpConfig?.defaultHeaders | json }}</p>
      <p>Está verificando se está online: Sim</p>

      <button (click)="makeRequest()">Fazer requisição.</button>
      <div class="test--result">
        {{ resultJson | json  }}
      </div>
      <hr>
      <button routerLink="/one">Ir para o um</button>
    </div>
  `,
})
export class TestHttpAsyncTwoComponent {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    private readonly http: HttpAsyncService,
    @Inject(HTTP_ASYNC_CONFIG)
    @Optional()
    public readonly httpConfig?: HttpAsyncConfig,
  ) { }

  //#endregion

  //#region Public Properties

  /**
   * O resultado da requisição
   */
  public resultJson?: string;

  //#endregion

  //#region Public Methods

  /**
   * Método que realiza uma requisição de teste
   */
  public async makeRequest(): Promise<void> {
    this.resultJson = await this.http.get('/1').then((result) => JSON.stringify(result));
  }

  //#endregion

}
