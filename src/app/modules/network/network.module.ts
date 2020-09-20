import { NgModule } from '@angular/core';

import { NetworkService } from './services/network.service';

@NgModule({
  providers: [
    NetworkService,
  ],
})
export class NetworkModule { }
