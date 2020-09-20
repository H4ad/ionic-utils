//#region Imports

import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, fromEvent, merge, Observable, Subscription } from 'rxjs';
import { mapTo, startWith } from 'rxjs/operators';

//#endregion

/**
 * A classe que representa o serviço que verifica se o usuário está conectado a internet
 *
 * Essa classe foi inspirada/copiada em partes desse repositório: https://github.com/ultrasonicsoft/ng-connection-service
 */
@Injectable()
export class NetworkService implements OnDestroy {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    protected readonly http: HttpClient,
  ) {
    this.hasInternetConnectionSubscription = this.hasInternetConnection$()
      .subscribe(isOnline => this.isOnlineSubject.next(isOnline));
  }

  //#endregion

  //#region Private Properties

  /**
   * A inscrição para o evento que determina se está online ou não
   */
  private readonly hasInternetConnectionSubscription: Subscription;

  /**
   * O BehaviorSubject que é usado para indicar se está online ou não
   */
  private readonly isOnlineSubject = new BehaviorSubject<boolean>(true);

  //#endregion

  //#region LifeCycle Events

  /**
   * Método executado quando o serviço é destruido
   */
  public ngOnDestroy(): void {
    this.hasInternetConnectionSubscription.unsubscribe();
    this.isOnlineSubject.unsubscribe();
  }

  //#endregion

  //#region Public Methods

  /**
   * Método que indica se o usuário está conectado a internet ou não
   */
  public isOnline(): boolean {
    return this.isOnlineSubject.getValue();
  }

  /**
   * Método que indica se o usuário está conectado a internet ou não
   */
  public isOnline$(): Observable<boolean> {
    return this.isOnlineSubject.asObservable();
  }

  //#endregion

  //#region Private Methods

  /**
   * Método que retorna a informação se o usuário está online - conectado a internet - ou está offline.
   */
  private hasInternetConnection$(): Observable<boolean> {
    return merge(
      fromEvent(window, 'offline').pipe(mapTo(false)),
      fromEvent(window, 'online').pipe(mapTo(true)),
    ).pipe(
      startWith(window.navigator.onLine),
    );
  }


  //#endregion

}
