import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import {
  startOfDay,
} from 'date-fns';
import { Subject } from 'rxjs';
import { Course } from './course';
import { CourseService} from  './course.service'
import { NgForm } from '@angular/forms';
import { Assignment } from './assignment/assignment';
import { PartialAssignment } from './assignment/partialAssignment';
import {Router, ActivatedRoute} from '@angular/router';
import { Grades } from './grades';

@Component({
  selector: 'app-root',
  templateUrl: './singleCourse.component.html',
  styleUrls: ['./app.component.css']
})
export class SingleCourseComponent implements OnInit {
  public course!: Course;
  public assignments!: Assignment[];
  public editAssignment!: Assignment;
  public deleteAssignment!: Assignment;
  public dueDate!: Date;
  public grades!: Grades;
  public counter!: number;
  public poss!: number;
  public scor!: number;
  
  constructor( private courseService: CourseService,private router: Router , private ar:ActivatedRoute){
    
  }
 
  ngOnInit(){//calls function when component is initialized
    console.log(history.state.data);
    this.getCourseInfo(history.state.data);
    this.dueDate = startOfDay(new Date());
    this.getAssignments(history.state.data);
    this.getGrades(history.state.data);
  }

  refresh = new Subject<void>();

  public getCourseInfo(index:number): void {
    this.courseService.getCourseInfo(index).subscribe(
      (response: Course)=>{
        this.course = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getAssignments(id:number): void {
    console.log("get Assignments called");
    this.courseService.getCourseAssignments(id).subscribe(
      (response: Assignment[])=>{
        this.counter = response.length;
        this.assignments = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getGrades(id:number): void {
    console.log("get Grades called");
    this.courseService.getCourseGrades(id).subscribe(
      (response: Grades)=>{
        this.grades = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddAssignment(addForm: NgForm): void {
   const addElement = document.getElementById('add-assignment-form');
   if (addElement===null){
     console.log("Add Element is null")
   }
   else{
     addElement.click();
   }

    this.courseService.addAssignment(addForm.value).subscribe(
      (response: Assignment) => {
        console.log(response);
        this.getAssignments(this.course.id);
        this.getGrades(history.state.data);
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateAssignment(assignment: Assignment): void {
    this.courseService.updateAssignment(assignment).subscribe(
      (response: Assignment) => {
        console.log(response);
        this.getAssignments(this.course.id);
        this.getGrades(history.state.data);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteAssignment(assignment: Assignment): void {
    this.courseService.deleteAssignment(assignment).subscribe(
      (response: Assignment) => {
        console.log(response);
        this.getAssignments(this.course.id);
        this.getGrades(history.state.data);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchAssignments(key: string): void {
    console.log(key);
    const results: Assignment[] = [];
    for (const assignment of this.assignments) {
      if (assignment.assignmentName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || assignment.description.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || assignment.dueDate.toLowerCase().indexOf(key.toLowerCase()) !== -1 ) {
        results.push(assignment);
      }
    }
    this.assignments = results;
    if (results.length === 0 || !key) {
      this.getAssignments(this.course.id);
    }
  }

  public downloadFile(index:number){

  }
  
  public onOpenModal(assignment: Assignment, mode: string): void{
    console.log("Called 'OnOpenModal'");
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type ='button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add'){
      button.setAttribute('data-target', '#addAssignmentModal');
       console.log("Attribute set to 'add'");
    }
    if (mode === 'edit'){
      this.editAssignment = assignment;
      button.setAttribute('data-target', '#updateAssignmentModal');
      console.log("Attribute set to 'update'");
    }
    if (mode === 'delete'){
      this.deleteAssignment=assignment;
      button.setAttribute('data-target', '#deleteAssignmentModal');
      console.log("Attribute set to 'delete'");
    }
    if (container!=null){
    container.appendChild(button);
    button.click();
    console.log("Button Clicked");
    }
    else{
      console.log("Click Failed");
    }
  }

  public navigateToSingleAssignment(index: number): void{
    this.router.navigate(["assignment"],{state: {data: this.assignments[index]}})

  }

  public navigateToHome(): void{

    this.router.navigate(["home"]);

    }

}

