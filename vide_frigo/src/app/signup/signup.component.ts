import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private registerForm: FormGroup;
  private input : FormData;

  @ViewChild("fileInput") fileInput;


  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) {
    const password = new FormControl(null, [Validators.required, Validators.minLength(8)]);
    const verifPassword = new FormControl(null, [Validators.required, CustomValidators.equalTo(password)]);
    this.registerForm = this.fb.group({
      email: [null, [Validators.required, CustomValidators.email]],
      username: [null, [Validators.required, Validators.minLength(2)]],
      password: password,
      confirmPassword: verifPassword,
      description: ''
    });
  }

  ngOnInit() {
  }

  ngOnSubmit() {
    this.authService.register(this.registerForm.value)
      .subscribe((result: any) => {
        if (result.error)
          console.log(result.error);
        else {
          this.loadPicture().subscribe((result: any) => {  });
          this.router.navigate(['']).catch(reason => console.log(reason));
        }
      }, err => {
        console.log(err);
      });
  }

  addFile(): void {
    let fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];
      this.input = new FormData();
      this.input.append("file", fileToUpload, fileToUpload.name);
    }
  }


  loadPicture() {
      let headers = new HttpHeaders();
      headers = headers.set('username',  localStorage.getItem('user.username'));
      return this.http.post('http://localhost:3000/auth/upload', this.input, {headers: headers}).map((data: any) => {
        console.log(data);
        localStorage.setItem('user.picture', data.picture);
      }, err => { console.log('err'); });
  }
}
