import { Component, Input } from '@angular/core';


type InputTypes = "text" | "password" | "email";

@Component({
  selector: 'app-primary-input',
  templateUrl: './primary-input.component.html',
  styleUrls: ['./primary-input.component.css']
})
export class PrimaryInputComponent {
@Input() type:InputTypes = "text";
@Input() formName:string = "";
@Input() placeholder:string = "";
@Input() label:string = "";

}
