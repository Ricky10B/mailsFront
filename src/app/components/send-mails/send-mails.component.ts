import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MailsService } from 'src/app/services/mails.service';

@Component({
  selector: 'app-send-mails',
  templateUrl: './send-mails.component.html',
  styleUrls: ['./send-mails.component.scss']
})
export class SendMailsComponent implements OnInit {
  mailForms:FormGroup;
  @Input() userSent;

  constructor(private fb:FormBuilder, private mailsService:MailsService) { }

  ngOnInit(): void {
    this.mailForms = this.fb.group({
      email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      message: ['', Validators.required]
    })
  }

  sendMail():void{
    this.mailsService.sendMailUser(this.mailForms.value).subscribe(() =>{
      this.mailForms.reset();
      this.messageMail('green', 'sentMailSuccessfully', 'Mail sent successfully')
    }, () =>{
      this.messageMail('red', 'sentMailError', 'An error occurred while sending the mail')
    })
  }

  messageMail(color, id, message){
    document.querySelector('form').insertAdjacentHTML('afterend', `
    <div class="w-10/12 xl:w-8/12 bg-${color}-500 py-2 px-4 rounded-lg mt-4 mx-auto" id="${id}">
      <p class="text-center text-lg font-bold">${message}</p>
    </div>`);
    setTimeout(() => {
      document.querySelector(`#${id}`).remove();
    }, 3000);
  }

}
