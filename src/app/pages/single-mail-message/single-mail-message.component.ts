import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MailsService } from 'src/app/services/mails.service';

@Component({
  selector: 'app-single-mail-message',
  templateUrl: './single-mail-message.component.html',
  styleUrls: ['./single-mail-message.component.scss'],
})
export class SingleMailMessageComponent implements OnInit {
  user: object = {};
  loader: boolean = true;
  message: boolean = false;
  userSendMail: string = '';
  constructor(private mailsService: MailsService, private router: Router) {}

  ngOnInit(): void {
    let idMessage = window.location.pathname.split('/')[3];
    this.mailsService.getSingleMail(idMessage).subscribe((res) => {
      this.loader = false;
      if (!res.data) {
        this.message = false;
        document.querySelector('#messagesBad').innerHTML = `<p class="text-xl font-bold text-center">This email doesn't exist</p>`;
      } else {
        this.message = true;
        this.user = res.data;
      }
    },() => {
      this.loader = false;
      this.message = false;
      document.querySelector('#messagesBad').innerHTML = `<p class="text-xl font-bold text-center">Sorry, there was an Unexpected error</p>`;
    });
  }

  responseMail(): void {
    this.userSendMail = document.querySelector('#userSendMail').textContent.split(' ')[2];
  }

  deleteMail(): void {
    let idMailDeleted = window.location.pathname.split('/')[3];
    let { email } = JSON.parse(atob(window.localStorage.getItem('token').split('.')[1]));
    this.mailsService.deleteMail({ email }, idMailDeleted).subscribe(() => {
      document.querySelector('#messagesBad').insertAdjacentHTML('afterend',`
        <div class="w-full sm:w-8/12 md:w-6/12 lg:w-5/12 xl:5/12 2xl:w-4/12 mx-auto">
            <div class="bg-green-500 text-center text-lg font-bold py-2 px-4 rounded-lg">
                <p>Mail deleted successfully &#10003;</p>
            </div>
        </div>`);
      setTimeout(() => {
        this.router.navigateByUrl('/home');
      }, 2000);
    },
    (err) => {
      console.log(err);
      document.querySelector('#messagesBad').insertAdjacentHTML('afterend',`
        <div class="w-full sm:w-8/12 md:w-6/12 lg:w-5/12 xl:5/12 2xl:w-4/12 mx-auto">
          <div class="bg-green-500 text-center text-lg font-bold py-2 px-4 rounded-lg">
            <p>An error ocurred while deleting the mail</p>
          </div>
        </div>`);
    });
  }
}
