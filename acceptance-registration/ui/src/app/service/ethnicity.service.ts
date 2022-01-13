import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Ethnicity } from '../model/ethnicity';
import { AppConfigService } from './app-config.service';
import { BasicApiService } from './basic-api.service';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class EthnicityService extends BasicApiService {

  private url = '/ethnicities';

  constructor(
    protected config: AppConfigService,
    protected override http: HttpClient,
    protected override messageService: MessageService
  ) {
    super(http, messageService);
    this.url = config.getConfig().apiUrl + '/ethnicities';
   }

   /**
    * This method is used to retrieve the list of Ethnicities from the API.
    * 
    * @returns a list of Ethnicity objects.
    */
   getEthnicities(): Observable<Ethnicity[]> {
    return this.http.get<Ethnicity[]>(this.url)
    .pipe(
      tap(_ => this.log('fetched ethnicities')),
        catchError(this.handleError<Ethnicity[]>('getEthnicities', []))
      );
  }
}
