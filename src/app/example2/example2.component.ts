import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-example2',
  templateUrl: './example2.component.html',
  styleUrls: ['./example2.component.css']
})
export class Example2Component implements OnInit {

  constructor() { }

  @Input() ex2_input:string = ""
  @Output() ex2TextClick = new EventEmitter<string>();

  ngOnInit(): void {
  }

  sendOutPut(){
    this.ex2TextClick.emit(this.ex2_input);
  }
}
