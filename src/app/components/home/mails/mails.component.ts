import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mails',
  templateUrl: './mails.component.html',
  styleUrls: ['./mails.component.scss']
})
export class MailsComponent implements OnInit {
  @Input() btnSelected;
  @Input() mails;
  @Input() charge;

  constructor() {
  }

  ngOnInit(): void {
  }

}
