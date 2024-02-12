import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-resource',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.css']
})
export class AddResourceComponent implements OnInit {
  resourceGroup: FormGroup;
  
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.resourceGroup = this.formBuilder.group({
      code: [''],
      title: [''],
      overview: [''],
      objectives: this.formBuilder.array([this.formBuilder.control('')]),
      attendees: this.formBuilder.array([this.formBuilder.control('')]),
      prerequisites: this.formBuilder.array([this.formBuilder.control('')]),
      modules: this.formBuilder.array([this.formBuilder.group({
        objective: [''],
        overview: ['']
      })]),
      // date: this.formBuilder.group({
      //   start: [''],
      //   duration: [''],
      //   durationUnit: [''],
      //   end: ['']
      // }),
      price: this.formBuilder.group({
        amount: [''],
        currency: ['']
      }),
      discount: [''],
      image: [null],
      // schedule: [null],
    });
  }
}
