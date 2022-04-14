// import { HttpErrorResponse } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { Assignment } from './assignment';
// import { NgForm } from '@angular/forms';
// import { CourseService } from './app.course.service';

// @Component({
//   selector: 'app-root',
//   templateUrl: './assignment.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AssignmentComponent implements OnInit {
//   public assignments!: Assignment[];
//   public editAssignment!: Assignment;
//   public deleteAssignment!: Assignment;
  

//   constructor(private courseService: CourseService){}
 
  
//   ngOnInit(){//calls function when component is initialized
//     this.getAssignments();
//   }

//   public getAssignments(): void {
//     this.assignmentService.getAssignments().subscribe(
//       (response: Assignment[])=>{
//         this.assignments = response;
//       },
//       (error: HttpErrorResponse) => {
//         alert(error.message);
//       }
//     );
//   }

//   public onAddAssignment(addForm: NgForm): void {
//    const addElement = document.getElementById('add-assignment-form');
//    if (addElement===null){
//      console.log("Add Element is null")
//    }
//    else{
//      addElement.click();
//    }
//     console.log("Got Add Form");
//     this.assignmentService.addAssignment(addForm.value).subscribe(
//       (response: Assignment) => {
//         console.log(response);
//         this.getAssignments();
//         addForm.reset();
//       },
//       (error: HttpErrorResponse) => {
//         alert(error.message);
//         addForm.reset();
//       }
//     );
//   }

//   public onUpdateAssignment(assignment: Assignment): void {
//     this.assignmentService.updateAssignment(assignment).subscribe(
//       (response: Assignment) => {
//         console.log(response);
//         this.getAssignments();
//       },
//       (error: HttpErrorResponse) => {
//         alert(error.message);
//       }
//     );
//   }

//   public onDeleteCourse(assignment: Assignment): void {
//     this.assignmentService.deleteAssignment(assignment).subscribe(
//       (response: void) => {
//         console.log(response);
//         this.getAssignments();
//       },
//       (error: HttpErrorResponse) => {
//         alert(error.message);
//       }
//     );
//   }


  
//   public onOpenModal2(assignment: Assignment, mode: string): void{
//     console.log("Called 'OnOpenModal2'");
//     const container = document.getElementById('main-container');
//     const button = document.createElement('button');
//     button.type ='button';
//     button.style.display = 'none';
//     button.setAttribute('data-toggle', 'modal');
//     if (mode === 'add'){
//       button.setAttribute('data-target', '#addAssignmentModal');
//        console.log("Attribute set to 'add'");
//     }
//     if (mode === 'edit'){
//       this.editAssignment = assignment;
//       button.setAttribute('data-target', '#updateAssignmentModal');
//       console.log("Attribute set to 'update'");
//     }
//     if (mode === 'delete'){
//       this.deleteAssignment = assignment;
//       button.setAttribute('data-target', '#deleteAssignmentModal');
//       console.log("Attribute set to 'delete'");
//     }
//     if (container!=null){
//     container.appendChild(button);
//     button.click();
//     console.log("Button CLicked");
//     }
//     else{
//       console.log("Click Failed");
//     }
//   }
// }