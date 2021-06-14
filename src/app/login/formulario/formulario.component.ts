import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])
  });

  constructor(private router: Router, private auth: AuthenticationService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(!this.loginForm.get('username')?.hasError('required') && !this.loginForm.get('password')?.hasError('required')){
      let user$ = this.auth.login(this.loginForm.value.username,this.loginForm.value.password);
      user$.subscribe(
        (data: any) => {
          console.log(data);
          if(data.user.rol == 'KID') this.router.navigate(['/kids']);
          if(data.user.rol == 'PROFESIONAL') this.router.navigate(['/teachers']);
        },
        err => console.error(err),
      );
    }else{
      if(this.loginForm.get('username')?.hasError('required')) this.loginForm.get('username')?.markAsTouched();
      if(this.loginForm.get('password')?.hasError('required')) this.loginForm.get('password')?.markAsTouched();
    }
  }
}
