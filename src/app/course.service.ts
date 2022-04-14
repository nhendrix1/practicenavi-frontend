import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import { Course } from "./course";
import { Assignment } from "./assignment/assignment";
import { environment } from "src/environments/environment";
import { AsFile } from "src/app/asFile";
import { Grades } from "./grades";

@Injectable({
    providedIn:'root'
})
export class CourseService{
    private apiServerUrl= environment.apiBaseUrl;

    constructor (private http: HttpClient){ }

    public getCourses(): Observable<Course[]>{
        return this.http.get<Course[]>(`${this.apiServerUrl}/course/all`)
    }

    public getCourseInfo(index:number): Observable<Course>{
        return this.http.get<Course>(`${this.apiServerUrl}/course/find/${index}`)
    }

    public addCourse(course: Course): Observable<Course>{
        return this.http.post<Course>(`${this.apiServerUrl}/course/add`,course)
    }

    public updateCourse(course: Course): Observable<Course>{
        return this.http.put<Course>(`${this.apiServerUrl}/course/update`,course)
    }
    public deleteCourse(course: Course): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/course/delete/${course.id}`)
    }

    public getCourseAssignments(index: number): Observable<Assignment[]>{
        return this.http.get<Assignment[]>(`${this.apiServerUrl}/course/${index}/assignments`)
    }

    public getAssignmentInfo(assignment: Assignment): Observable<Assignment>{
        return this.http.get<Assignment>(`${this.apiServerUrl}/course/assignment/${assignment.id}`)
    }

    public addAssignment(assignment: Assignment): Observable<Assignment>{
        return this.http.post<Assignment>(`${this.apiServerUrl}/course/assignment/add`,assignment)
    }

    public updateAssignment(assignment: Assignment): Observable<Assignment>{
        return this.http.put<Assignment>(`${this.apiServerUrl}/course/assignment/update`,assignment)
    }

    public deleteAssignment(assignment: Assignment): Observable<Assignment>{
        return this.http.delete<Assignment>(`${this.apiServerUrl}/course/assignment/delete/${assignment.id}`)
    }


    public getAssignmentFiles(assignment: Assignment): Observable<AsFile[]>{
        return this.http.get<AsFile[]>(`${this.apiServerUrl}/course/${assignment.id}/files`)
    }

    public addFile(asFile: any): Observable<any>{
        return this.http.post<AsFile>(`${this.apiServerUrl}/course/file/add`,asFile)
    }

    public deleteFile(file: AsFile): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/course/file/delete/${file.id}`)
    }

    public getCourseGrades(index:number): Observable<Grades>{
        return this.http.get<Grades>(`${this.apiServerUrl}/course/${index}/grades`)
    }
}