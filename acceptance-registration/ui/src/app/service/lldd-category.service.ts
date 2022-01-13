import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LLDDCategory } from '../model/lldd-category';
import { AppConfigService } from './app-config.service';
import { BasicApiService } from './basic-api.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class LLDDCategoryService extends BasicApiService {

  private url = '/lldd-categories';

  constructor(
    protected config: AppConfigService,
    protected override http: HttpClient,
    protected override messageService: MessageService
  ) {
    super(http, messageService);
    this.url = config.getConfig().apiUrl + '/lldd-categories';
   }

  /**
   * This method is used to retrieve the list of LLDD Categories from the API.
   * 
   * @returns a list of LLDDCategory objects.
   */
  getLLDDCategories(): Observable<LLDDCategory[]> {
    return this.http.get<LLDDCategory[]>(this.url)
    .pipe(
      tap(_ => this.log('fetched LlddHealthProblems')),
        catchError(this.handleError<LLDDCategory[]>('getLLDDCategories', []))
      );
  }
}

