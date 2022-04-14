import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import { Assignment } from "./assignment";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn:'root'
})
export class AssignmentService{
    private apiServerUrl= environment.apiBaseUrl;

    constructor (private http: HttpClient){ }

    public getAssignments(): Observable<Assignment[]>{
        return this.http.get<Assignment[]>(`${this.apiServerUrl}/assignment/all`)
    }

    public addAssignment(assignment: Assignment): Observable<Assignment>{
        return this.http.post<Assignment>(`${this.apiServerUrl}/assignment/add`,assignment)
    }

    public updateAssignment(assignment: Assignment): Observable<Assignment>{
        return this.http.put<Assignment>(`${this.apiServerUrl}/assignment/update`,assignment)
    }
    public deleteAssignment(assignment: Assignment): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/assignment/delete/${assignment.id}`)
    }
}