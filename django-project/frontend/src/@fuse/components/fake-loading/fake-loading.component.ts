import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-fake-loading',
  templateUrl: './fake-loading.component.html',
  styleUrls: ['./fake-loading.component.scss']
})

export class FakeLoadingComponent implements OnInit {
  @Input() type: string;
  constructor() { }

  ngOnInit(): void {
  }

}
