import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../model/student';
import { AppConfigService } from '../service/app-config.service';
import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent
  implements OnInit, OnChanges, ControlValueAccessor
{
  public useMockGrade;

  public form: FormGroup;

  private linkId!: string;

  public student!: Student;

  service: any;
  onChange: any;
  onTouched: any;
  ethnicityId: any;

  constructor(
    protected config: AppConfigService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private studentService: StudentService
  ) {
    this.useMockGrade = config.getConfig().useMockGrade;
    //IFD: console.log(data);
    this.form = this.formBuilder.group({
      id: [null],
      offerAccepted: [null, Validators.required],
      ethnicityId: [null, Validators.required],
      llddHealthProblemId: [null, Validators.required],
      llddCategory: [null],
      lookedAfterChildOrAdopted: [null, Validators.required],
      childrenServicesInvolvedAtSchool: [null, Validators.required],
      otherSocialSupportIssues: [null, Validators.required],
      freeMealsWhileAtSchool: [null, Validators.required],
      parentsUniversityEducated: [null, Validators.required],
      ehcp: [null, Validators.required],
      contactByPost: [null],
      contactByEmail: [null],
      contactByPhone: [null],
      studentSignature: [null, Validators.required],
      studentSignatureDate: [null, Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  writeValue(value: any) {
    if (value) {
      this.ethnicityId = value;
    }
  }
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.linkId = params['LinkId'];
      this.getStudent();
    });
  }

  /**
   * This method is used to retrieve the student data from the API using the supplied LinkID from the 
   * request parameter (e.g. ?LinkID={id}).
   */
  getStudent(): void {
    if (this.linkId !== undefined) {
      this.studentService.getByLinkId(this.linkId).subscribe((student) => {
        this.student = student;
        this.form.patchValue({
          id: student.id,
        });
        console.log(student);
      });
    }
  }

  /**
   * This method is used to save the acceptance and registration data back to the API.  
   * 
   * @param student
   */
  saveApplication(student: any): void {
    console.log('Save button trigerred');
    console.log(this.form.value);
    const data = this.form.value;
    const id = student.id;
    this.studentService.save(data).subscribe({
      next: res => {
        this.router.navigate(['parent']);   
        console.log("Application is successful");                                            
      },
    });
  }

  /**
   * This method is used to determine if the LLDD Selector should be visible. If the field is visible then the data 
   * is stored on the LLDDCategory field. If the field is not to be visible then the data is cleared. 
   * 
   * @returns true if visible, false if not.
   */
  showLLDDSelector() {
    let output = this.form.value.llddHealthProblemId != null && this.form.value.llddHealthProblemId == 1 ? true : false;
    if (!output) {
      this.form.patchValue({
        llddCategory: null
      })
    }
    return output;
  }

  /**
   * This method is used to retrieve the data from the LLDD Category selector. 
   * @returns 
   */
  lldds() {
    return this.form.value.llddCategory !== null ? this.form.value.llddCategory.value : '';
  }

  showDebug() {
    console.log(this.form);
  }

  /**
   * This method is used to determine if the form is valid and ready for submission or not. 
   * 
   * @returns 
   */
  isValid() {
    let data = this.form.value;
    if (data.offerAccepted === false) {
      return true;
    } else {
      if (data.llddHealthProblemId == 1 && data.llddCategory === null) {
        return false;
      }
      return this.form.valid;
    }
    return false;
  }

}
