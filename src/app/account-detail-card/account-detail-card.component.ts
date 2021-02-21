import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-account-detail-card',
  templateUrl: './account-detail-card.component.html',
  styleUrls: ['./account-detail-card.component.css']
})
export class AccountDetailCardComponent implements OnInit {
  @Input() account: any;
  constructor() { }

  ngOnInit(): void {
  }

}
