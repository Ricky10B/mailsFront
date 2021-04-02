import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MailsService } from 'src/app/services/mails.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private mailsContainer;
  btnMailsSelected = 'sends';
  mails = [];
  charge = true;

  constructor(private route:Router, private mailsServices:MailsService, private usersService: UsersService) { }

  ngOnInit(): void {
    this.mailsContainer = document.querySelector('.mails').firstElementChild.firstElementChild
    this.sendsMails();
    this.mailSends();
  }

  // Método para cambiar los estilos de los botones del home de la página
  // Mostrará el botón como seleccionado
  // Botón Sent
  sendsMails(){
    if(!this.mailsContainer.classList.contains('text-white')){
      this.mailSends();
      this.btnMailsSelected = 'sends';
      this.mailsContainer.classList.remove('bg-blue-300')
      this.mailsContainer.classList.add('text-white', 'border-2', 'border-gray-400', 'bg-blue-600')
      if(this.mailsContainer.nextElementSibling.classList.contains('text-white')){
        this.mailsContainer.nextElementSibling.classList.remove('text-white', 'border-2', 'border-gray-400', 'bg-blue-600')
        this.mailsContainer.nextElementSibling.classList.add('bg-blue-300')
      }
    }
  }

  // Botón Received
  receivedMails(){
    if(!this.mailsContainer.nextElementSibling.classList.contains('text-white')){
      this.mailsReceiveds();
      this.btnMailsSelected = 'received';
      this.mailsContainer.nextElementSibling.classList.remove('bg-blue-300')
      this.mailsContainer.nextElementSibling.classList.add('text-white', 'border-2', 'border-gray-400', 'bg-blue-600')
      if(this.mailsContainer.classList.contains('text-white')){
        this.mailsContainer.classList.remove('text-white', 'border-2', 'border-gray-400', 'bg-blue-600')
        this.mailsContainer.classList.add('bg-blue-300')
      }
    }
  }

  // Get All mail sends
  mailSends():void{
    this.mailsServices.getAllMailsSends().subscribe(res =>{
      if(res.ok){
        for(let i = 0; i < res.data.length; i++){
          let width = document.body.clientWidth;
          // Length of the words that are in the previous message those
          // that are in the home page
          let longitud:number = Math.floor(width/18);
          
          if(res.data[i].message.length > longitud){
            res.data[i].message = res.data[i].message.substring(0, longitud).trim() + '...';
          }
        }
        this.mails = res.data;
        this.charge = false;
      }
    }, () =>{
      document.querySelector('#mailsContainer').innerHTML = `
        <div class="w-10/12 xl:w-8/12 bg-red-400 text-xl font-extrabold rounded-lg py-2 px-4 text-center mt-8 mx-auto">
          <p>An error ocurred while fetching the emails</p>
        </div>
      `
    })
  }

  // Get All Mails Receiveds
  mailsReceiveds():void{
    this.mailsServices.getAllMailsReceiveds().subscribe(res =>{
      if(res.ok){
        for(let i = 0; i < res.data.length; i++){
          let width = document.body.clientWidth;
          // Length of the words that are in the previous message those
          // that are in the home page
          let longitud:number = Math.floor(width/18);
          
          if(res.data[i].message.length > longitud){
            res.data[i].message = res.data[i].message.substring(0, longitud).trim() + '...';
          }
        }
        this.mails = res.data;
        this.charge = false;
      }
    }, () =>{
      document.querySelector('#mailsContainer').innerHTML = `
        <div class="w-10/12 xl:w-8/12 bg-red-400 text-xl font-extrabold rounded-lg py-2 px-4 text-center mt-8 mx-auto">
          <p>An error ocurred while fetching the emails</p>
        </div>
      `
    })
  }

  logout(){
    this.usersService.logout().subscribe(res =>{
      if(res.ok){
        window.localStorage.removeItem('token')
        this.route.navigateByUrl('/')
      }
    }, () =>{
      document.querySelector('#mailsContainer').innerHTML = `
        <div class="w-10/12 xl:w-8/12 bg-red-400 text-xl font-extrabold rounded-lg py-2 px-4 text-center mt-8 mx-auto">
          <p>An error ocurred when logging out</p>
        </div>
      `
    })
  }

}
