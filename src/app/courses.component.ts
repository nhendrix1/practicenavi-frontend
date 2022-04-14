import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Course } from './course';
import { CourseService } from './course.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './courses.component.html',
  styleUrls: ['./app.component.css']
})
export class CoursesComponent implements OnInit {
  public courses!: Course[];
  public sendCourse!: Course;
  public editCourse!: Course;
  public deleteCourse!: Course;
  public thing!: string;
  
  constructor(private courseService: CourseService, private router: Router, private ar: ActivatedRoute){
     
  }
  ngOnInit(){//calls function when component is initialized
    this.getCourses();
    this.thing = "Hello";
  }
  public getCourses(): void {
    this.courseService.getCourses().subscribe(
      (response: Course[])=>{
        this.courses = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddCourse(addForm: NgForm): void {
   const addElement = document.getElementById('add-course-form');
   if (addElement===null){
     console.log("Add Element is null")
   }
   else{
     addElement.click();
   }
    console.log("Got Add Form");
    console.log(addForm.value)
    this.courseService.addCourse(addForm.value).subscribe(
      (response: Course) => {
        console.log(response);
        this.getCourses();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateCourse(course: Course): void {
    this.courseService.updateCourse(course).subscribe(
      (response: Course) => {
        console.log(response);
        this.getCourses();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteCourse(course: Course): void {
    this.courseService.deleteCourse(course).subscribe(
      (response: void) => {
        console.log(response);
        this.getCourses();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchCourses(key: string): void {
    console.log(key);
    const results: Course[] = [];
    for (const course of this.courses) {
      if (course.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || course.instructor.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || course.semester.toLowerCase().indexOf(key.toLowerCase()) !== -1 ) {
        results.push(course);
      }
    }
    this.courses = results;
    if (results.length === 0 || !key) {
      this.getCourses();
    }
  }
  
  public onOpenModal(course: Course, mode: string): void{
    console.log("Called 'OnOpenModal'");
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type ='button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add'){
      button.setAttribute('data-target', '#addCourseModal');
       console.log("Attribute set to 'add'");
    }
    if (mode === 'edit'){
      this.editCourse = course;
      button.setAttribute('data-target', '#updateCourseModal');
      console.log("Attribute set to 'update'");
    }
    if (mode === 'delete'){
      this.deleteCourse=course;
      button.setAttribute('data-target', '#deleteCourseModal');
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

  public navigateToSingleCourse(index: number): void{
    console.log(index);
      this.router.navigate(["course"],{state: {data: index}})

      }
  }

