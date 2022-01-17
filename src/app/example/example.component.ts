import { Component, OnInit } from '@angular/core';
import { IpService } from '../services/ip.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {
  constructor(private ipService: IpService) { }

  text_from_ts: string = ""
  text_from_input:string = "banana"
  banana_count: number = 2
  text_change = ""
  isHappy: boolean = false;
  loop:number[] = [];
  current_ip: any
  ex_variable: string = "input from example"
  output_from_ex2: string = ""
  userForm = new FormGroup({
    name: new FormControl(),
    age: new FormControl('20')
  });
  form_submit_result: string = ""
  isFormError: boolean = false;
  errorMessage: string = ""

  ngOnInit(): void {
    this.text_from_ts = "banana";
    this.setFormDefaultValue();    
  }

  addBanana(){
    this.banana_count++;
  }

  trashBanana(){
    this.banana_count = 0;
  }

  textChange(data:any){
    var value = data.target.value;
    this.text_change = value;
  }

  changeLoop(data: any){
    var value = data.target.value;
    this.setLoop(value);
  }

  setLoop(number:number)
  {
    document.querySelectorAll('.loop').forEach(function(a){
      a.remove()
    })
    for (let index = 0; index < number; index++) {
      this.loop.push(index+1)
    }
  }

  getCurrentIP(){
    this.ipService.get_current_ip().subscribe((resp: any) => {
      this.current_ip = resp.ip
    },(error) => {
      alert(error.message)
    });
  }

  exTextClick(data: any){
    this.output_from_ex2 = data;
  }

  clearOutput(){
    this.output_from_ex2 = "";
  }

  onFormSubmit()
  {
    this.isFormError = false;
    if(this.userForm.get('name')!.value === null || this.userForm.get('name')!.value === undefined || this.userForm.get('name')!.value === "")
    {
      this.isFormError = true;
      this.errorMessage = "Please check your name input."
    }

    if(this.userForm.get('age')!.value === null || this.userForm.get('age')!.value === undefined || this.userForm.get('age')!.value === 0)
    {
      this.isFormError = true;
      this.errorMessage = "Please check your age input."
    }

    if(this.isFormError == false)
    {
      var age = this.userForm.get('age')!.value ;
      var age_text = "You are under 25."
      if(age >= 25)
      {
        age_text = "You are an adult."
      }
      this.form_submit_result = "Your name is "+this.userForm.get('name')!.value.toUpperCase() + ". "+age_text;
      this.userForm.reset();
      this.setFormDefaultValue();
    }
  }

  setFormDefaultValue(){
    this.userForm.patchValue({name: ''}); 
  }
}
