import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  submitted = false;
  
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    if(form.valid) {
      this.submitted = true;
      form.resetForm();
      setTimeout(() => {
        this.submitted = false;
      }, 5000)
    }
  }
}
