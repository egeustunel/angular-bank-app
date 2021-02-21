import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-transfer',
  templateUrl: './list-transfer.component.html',
  styleUrls: ['./list-transfer.component.css']
})
export class ListTransferComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  makeTransaction(type): any {
    this.router.navigate(['transactions/make-transaction'], { queryParams: { type: type } });
  }

}
