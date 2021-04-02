import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {
  formLogin:FormGroup;
  formRegister:FormGroup;
  private divAccessAccounts:any;
  constructor(
    private fb:FormBuilder,
    private authService:UsersService,
    private route:Router
  ) { }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    })

    this.formRegister = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      surname: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      age: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]{2,3}$/)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    })

    // Contenedor de los modals login y register
    this.divAccessAccounts = document.querySelector('#Access-Accounts');
  }

  // Muestra la intarfaz para iniciar sesión
  login():void{
    this.closeLogin()
    if(!this.divAccessAccounts.lastElementChild.classList.contains('hidden')){
      this.closeRegister()
    }
  }

  // Muestra la intarfaz para registrarse
  register():void{
    this.closeRegister()
    if(!this.divAccessAccounts.firstElementChild.classList.contains('hidden')){
      this.closeLogin()
    }
  }

  // Cierra la interfaz de login
  closeLogin():void{
    this.divAccessAccounts.firstElementChild.classList.toggle('hidden');
  }

  // Cierra la interfaz de register
  closeRegister():void{
    this.divAccessAccounts.lastElementChild.classList.toggle('hidden');
  }

  // Envía los datos para iniciar sesión
  LoginAccount():void{
    this.authService.signIn(this.formLogin.value)
      .subscribe((res:any) => {
        if(res.ok){
          if(window.localStorage.getItem('token')){
            window.localStorage.removeItem('token');
          }
          window.localStorage.setItem('token', res.token)
          setTimeout(() =>{
            this.route.navigateByUrl('/home')
          },200)
        }else{
          this.messageError('Failed to login due to an unexpected error')
        }
      },
      err => {
        console.log(err)
        this.messageError(err.error.message)
      })
  }

  // Envía los datos para registrar un usuario
  RegisterAccount():void{
    this.authService.signUp(this.formRegister.value)
      .subscribe(() =>{
        // this.closeModal();
      }, err => {
        console.log(err)
        this.messageError(err.error.message)
      })
  }

  // Close modal when the user has have register
  closeModal():void{
    document.querySelector('#modalInformativeRegister').classList.toggle('hidden');
  }

  showNavbar():void{
    // Navbar en responsive para dispositivos pequeños
    const navbar:any = document.querySelector('#navbar');
    const bar:any = document.querySelector('#logoBarra');

    if(!navbar.classList.contains('-translate-y-40')){
      this.estilosNavbar(navbar, bar, '0');
    }else{
      this.estilosNavbar(navbar, bar,'90');
    }
  }

  estilosNavbar(navbar, bar, timeBar):void{
    if(navbar.classList.contains('-translate-y-40')){
      navbar.classList.replace('-translate-y-40', 'translate-y-0');
    }else{
      navbar.classList.replace('translate-y-0', '-translate-y-40');
    }
    bar.style.transform = `rotate(${timeBar}deg)`;
  }

  messageError(err:any):void{
    document.querySelector('.Login').insertAdjacentHTML('afterend',
    `<div class="messagesError">
        <div class="bg-red-700 text-lg text-white px-3 py-2 rounded-md border-2 border-red-400 hover:bg-red-900 hover:border-red-600">
            <p>${err}</p>
        </div>
      </div>`
    )
    setTimeout(() => {
      document.querySelector('.Login').nextElementSibling.remove()
    }, 6000);
  }

}
