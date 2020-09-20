import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { HttpAsyncConfig } from './models/http-async.config';
import { HTTP_ASYNC_CONFIG } from './models/injection-tokens';
import { HttpAsyncService } from './services/http-async.service';

@NgModule({
  imports: [
    HttpClientModule,
  ],
  providers: [
    HttpAsyncService,
  ],
})
export class HttpAsyncModule {

  /**
   * Método que irá criar uma nova instância de HttpAsyncModule e ainda te permite
   * modificar o comportamento padrão passando algumas configurações.
   *
   * @param configValue As configurações desse HttpAsyncModule
   */
  public static withConfig(configValue: HttpAsyncConfig | (() => HttpAsyncConfig)): ModuleWithProviders<HttpAsyncModule> {
    return {
      ngModule: HttpAsyncModule,
      providers: [
        {
          provide: HTTP_ASYNC_CONFIG,
          useValue: configValue,
        },
        HttpAsyncService,
      ],
    };
  }
}
