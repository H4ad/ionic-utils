//#region Imports

import { HttpErrorResponse } from '@angular/common/http';

//#endregion

/**
 * A interface que representa um resultado obtido de forma assincrona
 */
export interface AsyncResult<T> {

  /**
   * O resultado quando ocorre tudo certo
   */
  success?: T;

  /**
   * O resultado quando dá algum problema
   */
  error?: HttpErrorResponse;

}
