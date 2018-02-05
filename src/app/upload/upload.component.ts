import { Component, OnInit } from '@angular/core';
import {MediaService} from '../services/media.service';
import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Media} from '../interfaces/media';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  file: File;
  title: string;
  description: string;


  constructor(public mediaService: MediaService, private router: Router) { }

  setFile(evt) {
    console.log(evt.target.files[0]);
    this.file = evt.target.files[0];
  }

  upload() {

    const formData = new FormData();

    formData.append('file', this.file);
    formData.append('title', this.title);
    formData.append('description', this.description);

    console.log(formData);

    this.mediaService.upload(formData).subscribe( response => {
      console.log(response);
    }, (error: HttpErrorResponse) => {
      console.log(error.error.errorMessage);
    });
  }

  ngOnInit() {
    this.mediaService.getUserData().subscribe( response => {
      console.log(response['full_name']);
    }, (error: HttpErrorResponse) => {
      console.log(error);
      this.router.navigate(['login']);
    });
    }
  }
