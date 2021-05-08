import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Credenciales } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private router: Router, private auth: AuthenticationService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    let user$ = this.auth.login(this.loginForm.value.username,this.loginForm.value.password);
    user$.subscribe(
      (data: any) => console.log(data),
      err => console.error(err),
    );
    this.router.navigate(['/kids']);
  }
}
