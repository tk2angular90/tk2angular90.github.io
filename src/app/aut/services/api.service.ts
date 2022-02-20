import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

const {
  apiBaseUrl,
} = environment;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Api base url.
  private readonly _apiBaseUrl = apiBaseUrl;

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Get the test data.
   */
  getData(): Observable<[]> {
    return this.http.get<[]>(this._endpoint('/data.json'));
  }

  /**
   * Get the api endpoint.
   * @param path Path to append to the api base url.
   */
  private _endpoint(path: string): string {
    return this._apiBaseUrl + path;
  }
}
