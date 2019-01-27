//#region Imports

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

//#endregion

//#region Class

/**
 * Classe responsável por lidar com as chamadas na APIs
 */
@Injectable({
  providedIn: 'root'
})
export class Http {

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

  //#region Restfull Methods

  /**
   * Envia uma requisição com o método POST
   *
   * @param url Url para a requisição. Obs: Ele já é automaticamente combinado com a url base
   * @param payload Informações a serem enviadas para o servidor
   * @param handleSuccessful Executado quando a requisição possui um status code de sucesso
   * @param handleError Executado quando a requisição possui um status code de erro
   * @param handleComplete Executado quando a requisição é completa independente do status code
   * @param customOptions Opções customizadas para esta requisição
   */
  public post<T>(
    url:string,
    payload: object,
    handleSuccessful: (response: T) => void,
    handleError?: (response: HttpErrorResponse) => void,
    handleComplete?: () => void,
    customOptions?: object
  ): void {
    this.http.post(this.baseUrl + url, payload, customOptions).subscribe(new BaseObserve<T>(handleSuccessful, handleError, handleComplete));
  }

  /**
   * Envia uma requisição com o método GET
   *
   * @param url Url para a requisição. Obs: Ele já é automaticamente combinado com a url base
   * @param handleSuccessful Executado quando a requisição possui um status code de sucesso
   * @param handleError Executado quando a requisição possui um status code de erro
   * @param handleComplete Executado quando a requisição é completa independente do status code
   * @param customOptions Opções customizadas para esta requisição
   */
  public get<T>(
    url:string,
    handleSuccessful: (response: T) => void,
    handleError?: (response: HttpErrorResponse) => void,
    handleComplete?: () => void,
    customOptions?: object
  ): void {
    this.http.get(this.baseUrl + url, customOptions).subscribe(new BaseObserve<T>(handleSuccessful, handleError, handleComplete));
  }

  /**
   * Envia uma requisição com o método PUT
   *
   * @param url Url para a requisição. Obs: Ele já é automaticamente combinado com a url base
   * @param payload Informações a serem enviadas para o servidor
   * @param handleSuccessful Executado quando a requisição possui um status code de sucesso
   * @param handleError Executado quando a requisição possui um status code de erro
   * @param handleComplete Executado quando a requisição é completa independente do status code
   * @param customOptions Opções customizadas para esta requisição
   */
  public put<T>(
    url:string,
    payload: object,
    handleSuccessful: (response: T) => void,
    handleError?: (response: HttpErrorResponse) => void,
    handleComplete?: () => void,
    customOptions?: object
  ): void {
    this.http.put(this.baseUrl + url, payload, customOptions).subscribe(new BaseObserve<T>(handleSuccessful, handleError, handleComplete));
  }

  /**
   * Envia uma requisição com o método DELETE
   *
   * @param url Url para a requisição. Obs: Ele já é automaticamente combinado com a url base
   * @param handleSuccessful Executado quando a requisição possui um status code de sucesso
   * @param handleError Executado quando a requisição possui um status code de erro
   * @param handleComplete Executado quando a requisição é completa independente do status code
   * @param customOptions Opções customizadas para esta requisição
   */
  public delete<T>(
    url:string,
    handleSuccessful: (response: T) => void,
    handleError?: (response: HttpErrorResponse) => void,
    handleComplete?: () => void,
    customOptions?: object
  ): void {
    this.http.delete(this.baseUrl + url, customOptions).subscribe(new BaseObserve<T>(handleSuccessful, handleError, handleComplete));
  }

  //#endregion

}


/**
 * Lida com as requisições
 */
export class BaseObserve <TModel> implements Observer <TModel> {

  //#region Construtor

  /**
   * Construtor padrão
   *
   * @param handleSuccessful Executado quando a requisição possui um status code de sucesso
   * @param handleError Executado quando a requisição possui um status code de erro
   * @param handleComplete Executado quando a requisição é completa independente do status code
   */
  constructor(
    public handleSuccessful?: (response: TModel) => void,
    public handleError?: (response: HttpErrorResponse) => void,
    public handleComplete?: () => void
  ) {}

  //#endregion

  //#region Methods

  /**
   * Executado quando a requisição possui um status code de sucesso
   *
   * @param response Resposta do servidor de sucesso
   */
  public next(response: TModel): void {
    this.handleSuccessful.call(null, response);
  }

  /**
   * Executado quando a requisição possui um status code de erro
   *
   * @param error Resposta do servidor de erro
   */
  public error(error: HttpErrorResponse): void {
    if(this.handleError == undefined)
      return;

    this.handleError.call(null, error);
  }

  /**
   * Executado quando a requisição é completa independente do status code
   */
  public complete(): void {
    if(this.handleComplete == undefined)
      return;

    this.handleComplete.call(null);
  }

  //#endregion

}

//#endregion