import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../model/student';
import { AppConfigService } from '../service/app-config.service';
import { StudentService } from '../service/student.service';


@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  public useMockGrade;

  private linkId!: string;

  public student!: Student;
  public form: FormGroup;

  constructor(protected config: AppConfigService,
    private route: ActivatedRoute, 
    private router: Router,
    private formBuilder: FormBuilder,
    private studentService: StudentService
    ) {
      this.useMockGrade = config.getConfig().useMockGrade;
      this.form = this.formBuilder.group({
        id: [null],
      parentSignature: ['', Validators.required],
      parentSignatureDate: ['', Validators.required]
      });
     }

  ngOnInit(): void {
    console.log("parent form");
    this.route.queryParams.subscribe(params => {
      this.linkId = params['LinkId'];
      this.getStudent();

    });
  }

  getStudent(): void {
    if (this.linkId !== undefined) {
      this.studentService.getByLinkId(this.linkId).subscribe(student => {
        this.student = student;
        console.log(student);
      });
    }
  }

  saveParentAcceptance(student: any): void {
    console.log('Save Parent button trigerred');
    console.log(this.form.value);
    const data = this.form.value;
    data.id = student.id;
    this.studentService.saveParentAcceptance(data).subscribe({
      next: res => {
        this.router.navigate(['application-confirmation']);   
        console.log("Parent accecptance is saved");                                            
      },
    });
  }

}
