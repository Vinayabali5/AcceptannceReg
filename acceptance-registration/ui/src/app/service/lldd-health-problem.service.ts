import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BasicApiService } from './basic-api.service';
import { LLDDHealthProblem } from '../model/lldd-health-problem';
import { AppConfigService } from './app-config.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class LLDDHealthProblemService extends BasicApiService {

  private url = '/lldd-health-problems';

  constructor(
    protected config: AppConfigService,
    protected override http: HttpClient,
    protected override messageService: MessageService    
  ) {
    super(http, messageService);
    this.url = config.getConfig().apiUrl + '/lldd-health-problems';
   }

  /**
   * This method is used to retrieve the list of LLDD Health Problem from the API.
   * 
   * @returns a list of LLDDHealthProblem objects.
   */
  getLLDDHealthProblems(): Observable<LLDDHealthProblem[]> {
    return this.http.get<LLDDHealthProblem[]>(this.url)
    .pipe(
      tap(_ => this.log('fetched LlddHealthProblems')),
        catchError(this.handleError<LLDDHealthProblem[]>('getLLDDHealthProblems', []))
      );
  }
}
