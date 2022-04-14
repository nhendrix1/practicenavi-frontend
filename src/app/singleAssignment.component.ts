import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CourseService} from  './course.service'
import { NgForm } from '@angular/forms';
import { Assignment } from './assignment/assignment';
import {Router, ActivatedRoute} from '@angular/router';
import { Grades } from './grades';
import { AsFile } from 'src/app/asFile';
import {FileService} from './file.service';
import { environment } from 'src/environments/environment';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { ApplicationCostProfiler } from 'aws-sdk';

@Component({
  selector: 'app-root',
  templateUrl: './singleAssignment.component.html',
  styleUrls: ['./app.component.css']
})
export class SingleAssignmentComponent implements OnInit {
  public assignment!: Assignment;
  public files!: AsFile[];
  public s3File!: File;
  public addFile!: any;
  public deleteFile!: AsFile;
  public grades!: Grades;
  public counter!: Number;
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file: File | undefined ; // Variable to store file

//   private bucket = new S3(
//     {
//         accessKeyId: 'AKIATCHLVOHUPZRL22GG',
//         secretAccessKey: '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',
//         region: 'US East (N. Virginia) us-east-1'
//     }
// );
  
  constructor( private courseService: CourseService,private router: Router , private ar:ActivatedRoute, private fileService: FileService){
    
  }
 
  ngOnInit(){//calls function when component is initialized
    this.assignment = history.state.data;
    this.getFiles();
  }

  public getFiles(): void {
    console.log("get Files called");
    this.courseService.getAssignmentFiles(this.assignment).subscribe(
      (response: AsFile[])=>{
        this.counter = response.length;
        this.files = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // public onAddFile(addForm: NgForm): void {
  //  const addElement = document.getElementById('add-file-form');
  //  if (addElement===null){
  //    console.log("Add Element is null")
  //  }
  //  else{
  //    addElement.click();
  //  }
  // //  const s3File:FileList=addForm.value;
  
  // //  this.addFile = {
  // //    assignmentID: this.assignment.id,
  // //   courseID: this.assignment.courseID,
  // //   fileName: s3File.item(0)?.name,
  // //   uri: "s3://coursenavi/assignmentFiles/"+this.assignment.courseID.toString()+"/"+this.assignment.id.toString()+this.s3File.name
  // //  }

  //  const key:string = this.assignment.courseID.toString()+"/"+this.assignment.id.toString() + this.s3File.name;
  // //  const params = {
  // //   Bucket: 's3://coursenavi/',
  // //   Key: key,
  // //   Body: s3File.item(0),
  // //   ACL: 'public-read',
  // //   ContentType: this.s3File.type
  // // };

  // // this.bucket.upload(params);
     
  // }
  onChange(event: any) {
    this.file = event.target.files[0];
}

  public onUpload(): void{
    this.loading = !this.loading;
        console.log(this.file);
        const fileName=this.file?.name;
        this.fileService.upload(this.file).subscribe(
            (event: any) => {
                if (typeof (event) === 'object') {
  
                    // Short link via api response
                    this.shortLink = event.link;
                    console.log(this.shortLink);
                    this.loading = false; // Flag variable 
                    this.addFile = {
                      assignmentID: this.assignment.id,
                      courseID: this.assignment.courseID,
                      fileName: fileName,
                      uri: this.shortLink
                      };
            
                      console.log(this.addFile);
            
                    this.courseService.addFile(this.addFile).subscribe(
                      (response: AsFile) => {
                        console.log(response);
                        this.getFiles();
                      },
                      (error: HttpErrorResponse) => {
                        alert(error.message);
                      }
                    );
                }
            }
        );
          
      }

  public onDeleteFile(deleteFile: AsFile): void {
    this.courseService.deleteFile(this.deleteFile).subscribe(
      (response: void) => {
        console.log(response);
        this.getFiles();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
  public onOpenModal(asFile: AsFile, mode: string): void{
    console.log("Called 'OnOpenModal'");
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type ='button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add'){
      button.setAttribute('data-target', '#addFileModal');
       console.log("Attribute set to 'add'");
    }
    if (mode === 'delete'){
      this.deleteFile=asFile;
      button.setAttribute('data-target', '#deleteFileModal');
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
    this.router.navigate(["course"],{state: {data: index}});
    }

  public navigateToHome(): void{
    this.router.navigate(["home"]);
 }

 public goToDownload(uri: string): void{
   window.open( 
              uri, "_blank");
 }
}