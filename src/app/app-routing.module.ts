
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent} from "./courses.component";
import { SingleCourseComponent } from './singleCourse.component';
import { SingleAssignmentComponent } from './singleAssignment.component';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {path: '', component: CoursesComponent},
  {path: 'home', component: CoursesComponent},
  {path: 'course', component: SingleCourseComponent},
  {path: 'assignment',component: SingleAssignmentComponent}

];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
export const routingComponents =[CoursesComponent, SingleCourseComponent, SingleAssignmentComponent];

