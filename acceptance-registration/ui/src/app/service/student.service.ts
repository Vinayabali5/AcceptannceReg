import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { AppConfigService } from './app-config.service';

import { MessageService } from './message.service';
import { Student } from '../model/student';
import { BasicApiService } from './basic-api.service';



@Injectable({
  providedIn: 'root'
})
export class StudentService extends BasicApiService {

  private url = '/students';

  override httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8080'
   })
  };

  constructor(
    protected config: AppConfigService,
    protected override http: HttpClient,
    protected override messageService: MessageService
  ) {
    super(http, messageService);
    this.url = config.getConfig().apiUrl + '/students';
  }

  /**
   * This method is used to retrieve a Student's acceptance and registration information from the API.
   * 
   * @param linkId a LinkID string used to retrieve the data. 
   * @returns 
   */
  getByLinkId(linkId: string): Observable<Student> {
    const url = `${this.url}?LinkId=${linkId}`;
    return this.http.get<Student>(url).pipe(
      tap(_ => this.log(`fetched student with LinkId=${linkId}`)),
      catchError(this.handleError<Student>(`getByLinkId linkId=${linkId}`))
    );
  }

  /**
   * This method is used to save the supplied student data to the API. 
   * 
   * @param student Student's acceptance and registration data.
   * @returns 
   */
  save(student: Student): Observable<Student>{
    console.log('Attempting Acceptance registration update');
    const url = `${this.url}/acceptance-registration`;
    return this.http.post<Student>(url, student, this.httpOptions).pipe(
      tap(_ => this.log(`updating student accepting registration form: ${student}`)),
      catchError(this.handleError<Student>(`update studentAcceptanceRegistration=${student}`))
    );
  }

  /**
   * This method is used to save the supplied student data to the API. 
   * 
   * @param student Parent's acceptance and registration data.
   * @returns 
   */
   saveParentAcceptance(student: Student): Observable<Student>{
    console.log('Attempting Parent Acceptance registration update');
    const url = `${this.url}/parent-acceptance`;
    return this.http.post<Student>(url, student, this.httpOptions).pipe(
      tap(_ => this.log(`updating student accepting registration form: ${student}`)),
      catchError(this.handleError<Student>(`update studentAcceptanceRegistration=${student}`))
    );
  }

}
