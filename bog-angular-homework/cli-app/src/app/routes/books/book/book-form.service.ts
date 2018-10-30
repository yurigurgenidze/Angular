import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BookFormService {
  form = this.formBuilder.group({
    id: '',
    title: ['', Validators.minLength(3)],
    shortDescription: ['', Validators.minLength(3)],
    fullDescription: ''
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  getErrors(controlName: string) {
    return Object.values(this.form.get(controlName).errors || {});
  }

  isInvalid(controlName: string) {
    return !this.form.get(controlName).valid && this.form.get(controlName).dirty;
  }
}
