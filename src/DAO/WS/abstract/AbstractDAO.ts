import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export class AbstractDAO<T> {

    protected http: HttpClient;
    private endpoint: string;

    protected httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'        
        })
      };

    constructor(http: HttpClient, endpoint: string) {
        this.http = http;
        this.endpoint = 'rest/'+endpoint;
    }

    protected getFullRoute(route: string): string {
        return environment.hostname + this.endpoint+'/'+route;
    }

}