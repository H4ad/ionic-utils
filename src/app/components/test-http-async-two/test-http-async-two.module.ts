import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HttpAsyncModule } from '../../modules/http-async/http-async.module';
import { BaseUrlInterceptor } from '../../modules/http-async/interceptors/base-url.interceptor';
import { BearerTokenInterceptor } from '../../modules/http-async/interceptors/bearer-token.interceptor';
import { HttpAsyncHeadersInterceptor } from '../../modules/http-async/interceptors/http-async-headers.interceptor';
import { IsOfflineInterceptor } from '../../modules/network/interceptors/is-offline.interceptor';
import { NetworkModule } from '../../modules/network/network.module';
import { TestHttpAsyncTwoComponent } from './test-http-async-two.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: TestHttpAsyncTwoComponent },
    ]),
    CommonModule,
    HttpAsyncModule.withConfig({
      baseUrl: 'https://jsonplaceholder.typicode.com/todos',
      defaultHeaders: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Http-Async-Component': 'TestHttpAsyncOneComponent',
      },
      bearerTokenKey: 'AUTH_TOKEN_KEY',
    }),
    NetworkModule,
  ],
  exports: [
    TestHttpAsyncTwoComponent,
  ],
  declarations: [
    TestHttpAsyncTwoComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpAsyncHeadersInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: BearerTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: IsOfflineInterceptor, multi: true },
  ],
})
export class TestHttpAsyncTwoModule {}
