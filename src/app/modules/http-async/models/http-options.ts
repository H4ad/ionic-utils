import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface DefaultOptions {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };

  withCredentials?: boolean;
}

export interface ExtraOptions extends DefaultOptions {
  params?: HttpParams | {
    [param: string]: string | string[];
  };

  reportProgress?: boolean;

}
