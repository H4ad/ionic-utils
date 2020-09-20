//#region Imports

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { AsyncResult } from '../models/async-result';
import { DefaultOptions, ExtraOptions } from '../models/http-options';

//#endregion

/**
 * A classe que representa um serviço responsável por lidar com as chamadas assíncronas em um Endpoint
 */
@Injectable()
export class HttpAsyncService {

  //#region Construtor

  /**
   * Construtor padrão
   */
  constructor(
    protected readonly http: HttpClient,
  ) { }

  //#endregion

  //#region Private Properties

  /**
   * O evento emitido ao ocorrer um erro com a requisição
   */
  private readonly onHttpError: Subject<HttpErrorResponse> = new Subject<HttpErrorResponse>();

  //#endregion

  //#region Public Methods

  /**
   * Método que retorna o evento chamado ao ocorrer um erro com a chamada API
   */
  public getOnHttpError$(): Observable<HttpErrorResponse> {
    return this.onHttpError.asObservable();
  }

  //#endregion

  //#region Private Methods

  /**
   * Converte um resultado para AsyncResult para quando der certo
   *
   * @param result O resultado obtido
   */
  private success<T>(result: T): AsyncResult<T> {
    return {
      success: result,
    };
  }

  /**
   * Encapsula o erro no AsyncResult
   *
   * @param error O erro enviado pelo servidor
   */
  private error<T>(error: HttpErrorResponse): AsyncResult<T> {
    this.onHttpError.next(error);

    return {
      error,
    };
  }

  //#endregion

  //#region Async Restfull Methods

  /**
   * Envia uma requisição com o método GET de forma assincrona
   *
   * @param url Url para a requisição. Obs: Ele já é automaticamente combinado com a url base
   * @param options As opções a mais que você pode passar para as requisições
   */
  public async get<T>(
    url: string,
    options?: DefaultOptions,
  ): Promise<AsyncResult<T>> {
    return await this.http.get<T>(url).toPromise()
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
   * @param options As opções a mais que você pode passar para as requisições
   */
  public async post<T>(
    url: string,
    payload: object,
    options?: ExtraOptions,
  ): Promise<AsyncResult<T>> {
    return await this.http.post<T>(url, payload, options).toPromise()
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
   * @param options As opções a mais que você pode passar para as requisições
   */
  public async put<T>(
    url: string,
    payload: object,
    options?: ExtraOptions,
  ): Promise<AsyncResult<T>> {
    return await this.http.put<T>(url, payload, options).toPromise()
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
   * @param options As opções a mais que você pode passar para as requisições
   */
  public async delete<T>(
    url: string,
    options?: ExtraOptions,
  ): Promise<AsyncResult<T>> {
    return await this.http.delete<T>(url, options).toPromise()
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


