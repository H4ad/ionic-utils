//#region Imports

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

//#endregion

//#region Class

/**
 * Classe responsável por lidar com as chamadas assincronas nas APIs
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
    public http: HttpClient,
  ) {}

  //#endregion

  //#region Properties

  /**
   * Url base para realizar as chamadas
   */
  private readonly baseUrl: string = "API_ENDPOINT";

  //#endregion

  //#region Public Methods

  /**
   * Converte um resultado para AsyncResult para quando der certo
   *
   * @param result O resultado obtido
   */
  public success<T>(result: T): AsyncResult<T> {
    return <AsyncResult<T>>{
      result: result
    };
  }

  /**
   * Encapsula o erro no AsyncResult
   *
   * @param error O erro enviado pelo servidor
   */
  public error<T>(error: HttpErrorResponse): AsyncResult<T> {
    console.error(error);

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
  public async getAsync<T>(
    url:string
  ): Promise<AsyncResult<T>> {
    return await this.http.get<T>(this.baseUrl + url).toPromise()
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
  public async postAsync<T>(
    url:string,
    payload: object
  ): Promise<AsyncResult<T>> {
    return await this.http.post<T>(this.baseUrl + url, payload).toPromise()
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
  public async putAsync<T>(
    url:string,
    payload: object
  ): Promise<AsyncResult<T>> {
    return await this.http.put<T>(this.baseUrl + url, payload).toPromise()
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
   * @param payload Informações a serem enviadas para o servidor
   */
  public async deleteAsync<T>(
    url:string
  ): Promise<AsyncResult<T>> {
    return await this.http.delete<T>(this.baseUrl + url).toPromise()
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
  result: T;

  /**
   * O resultado quando dá algum problema
   */
  error: HttpErrorResponse;

}

//#endregion
