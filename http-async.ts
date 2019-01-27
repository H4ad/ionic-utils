//#region Imports

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

//#endregion

//#region Class

/**
 * A classe que representa um serviço responsável por lidar com as chamadas assincronas em um Endpoint
 */
@Injectable({
  providedIn: 'root'
})
export class HttpAsync {

  //#region Construtor

  /**
   * Construtor padrão
   *
   * @param http Modulo HTTP
   */
  constructor(
    private readonly http: HttpClient,
  ) {
    this.onAsyncResultError = new Subject<HttpErrorResponse>();
  }

  //#endregion

  //#region Private Properties

  /**
   * Url base para realizar as chamadas
   */
  private readonly baseUrl: string = "API_ENDPOINT";

  /**
   * O evento emitido ao ocorrer um erro com a requisição
   */
  private readonly onAsyncResultError: Subject<HttpErrorResponse>;

  /**
   * O método que realiza validações antes de executar uma requisição
   */
  private beforeValidations: () => Promise<AsyncResult<any>>;

  /**
   * O método que retorna alguns HTTP Header a serem adicionados
   */
  private loadHeaders: () => Promise<HttpHeaders>;

  //#endregion

  //#region Public Methods

  /**
   * Método que seta uma validação a ser executado antes de cada requisição
   */
  public setBeforeValidations(beforeValidation: () => Promise<AsyncResult<any>>): void {
    this.beforeValidations = beforeValidation;
  }

  /**
   * Método que seta uma validação a ser executado antes de cada requisição
   */
  public setLoadHeaders(loadHeader: () => Promise<HttpHeaders>): void {
    this.loadHeaders = loadHeader;
  }

  /**
   * Método que retorna o evento chamado ao ocorrer um erro com a chamada API
   */
  public getOnAsyncResultError(): Subject<HttpErrorResponse> {
    return this.onAsyncResultError;
  }

  //#endregion

  //#region Private Methods

  /**
   * Converte um resultado para AsyncResult para quando der certo
   *
   * @param result O resultado obtido
   */
  private success<T>(result: T): AsyncResult<T> {
    return <AsyncResult<T>>{
      success: result
    };
  }

  /**
   * Encapsula o erro no AsyncResult
   *
   * @param error O erro enviado pelo servidor
   */
  private error<T>(error: HttpErrorResponse): AsyncResult<T> {
    this.onAsyncResultError.next(error);

    return <AsyncResult<T>> {
      error: error
    };
  }

  //#endregion

  //#region Async Restfull Methods

  /**
   * Envia uma requisição com o método GET de forma assincrona
   *
   * @param url Url para a requisição. Obs: Ele já é automaticamente combinado com a url base
   */
  public async get<T>(
    url:string
  ): Promise<AsyncResult<T>> {
    if(this.beforeValidations) {
      const validationResult = await this.beforeValidations();

      if(validationResult.error !== undefined) {
        this.onAsyncResultError.next(validationResult.error);

        return validationResult;
      }
    }

    const headers: { headers: HttpHeaders } = this.loadHeaders != undefined ? { headers: await this.loadHeaders() } : undefined;

    return await this.http.get<T>(this.baseUrl + url, headers).toPromise()
      .then((data: T) => {
        return this.success(data);
      })
      .catch((error: HttpErrorResponse) => {
        return this.error<T>(error);
      })
      .then<AsyncResult<T>>((result: AsyncResult<T>) => {
        return result;
      });
  }

  /**
   * Envia uma requisição com o método POST
   *
   * @param url Url para a requisição. Obs: Ele já é automaticamente combinado com a url base
   * @param payload Informações a serem enviadas para o servidor
   */
  public async post<T>(
    url:string,
    payload: object
  ): Promise<AsyncResult<T>> {
    if(this.beforeValidations) {
      const validationResult = await this.beforeValidations();

      if(validationResult.error !== undefined) {
        this.onAsyncResultError.next(validationResult.error);

        return validationResult;
      }
    }

    const headers: { headers: HttpHeaders } = this.loadHeaders != undefined ? { headers: await this.loadHeaders() } : undefined;

    return await this.http.post<T>(this.baseUrl + url, payload, headers).toPromise()
      .then((data: T) => {
        return this.success(data);
      })
      .catch((error: HttpErrorResponse) => {
        return this.error<T>(error);
      })
      .then<AsyncResult<T>>((result: AsyncResult<T>) => {
        return result;
      });
  }

  /**
   * Envia uma requisição com o método PUT
   *
   * @param url Url para a requisição. Obs: Ele já é automaticamente combinado com a url base
   * @param payload Informações a serem enviadas para o servidor
   */
  public async put<T>(
    url:string,
    payload: object
  ): Promise<AsyncResult<T>> {
    if(this.beforeValidations) {
      const validationResult = await this.beforeValidations();

      if(validationResult.error !== undefined) {
        this.onAsyncResultError.next(validationResult.error);

        return validationResult;
      }
    }

    const headers: { headers: HttpHeaders } = this.loadHeaders != undefined ? { headers: await this.loadHeaders() } : undefined;

    return await this.http.put<T>(this.baseUrl + url, payload, headers).toPromise()
      .then((data: T) => {
        return this.success(data);
      })
      .catch((error: HttpErrorResponse) => {
        return this.error<T>(error);
      })
      .then<AsyncResult<T>>((result: AsyncResult<T>) => {
        return result;
      });
  }

/**
   * Envia uma requisição com o método DELETE
   *
   * @param url Url para a requisição. Obs: Ele já é automaticamente combinado com a url base
   */
  public async delete<T>(
    url:string
  ): Promise<AsyncResult<T>> {
    if(this.beforeValidations) {
      const validationResult = await this.beforeValidations();

      if(validationResult.error !== undefined) {
        this.onAsyncResultError.next(validationResult.error);

        return validationResult;
      }
    }

    const headers: { headers: HttpHeaders } = this.loadHeaders != undefined ? { headers: await this.loadHeaders() } : undefined;

    return await this.http.delete<T>(this.baseUrl + url, headers).toPromise()
      .then((data: T) => {
        return this.success(data);
      })
      .catch((error: HttpErrorResponse) => {
        return this.error<T>(error);
      })
      .then<AsyncResult<T>>((result: AsyncResult<T>) => {
        return result;
      });
  }

  //#endregion

}

//#endregion


//#region Interfaces

/**
 * A interface que representa um resultado obtido de forma assincrona
 */
export interface AsyncResult<T> {

  /**
   * O resultado quando ocorre tudo certo
   */
  success: T;

  /**
   * O resultado quando dá algum problema
   */
  error: HttpErrorResponse;

}

//#endregion
