import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'one' },
  { path: 'one', loadChildren: () => import('./components/test-http-async-one/test-http-async-one.module').then(m => m.TestHttpAsyncOneModule) },
  { path: 'two', loadChildren: () => import('./components/test-http-async-two/test-http-async-two.module').then(m => m.TestHttpAsyncTwoModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {}
