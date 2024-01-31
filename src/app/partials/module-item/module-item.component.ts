import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Module } from 'src/app/interfaces/course';

@Component({
  selector: 'app-module-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './module-item.component.html',
  styleUrls: ['./module-item.component.css']
})
export class ModuleItemComponent implements OnInit {
  @Input() module!: Module;
  @Input() index!: number;
  expanded: boolean;
  
  ngOnInit(): void {
    this.expanded = false;
    console.log('initialized')
  }
  // constructor() {
  //   this.expanded = false;
  // }

  

  toggleDropdown() {
    // console.log('in toggle and expnaded is ', this.expanded)
    this.expanded = !this.expanded;
    // console.log('after toggling expnaded is ', this.expanded)
  }
}
