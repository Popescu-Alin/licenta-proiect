import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post, PostResponse } from '../../client/client';
import { Subscription } from 'rxjs';
import { PostService } from '../../services/post.service';
import { CustomAlertService } from '../../services/custom-alert.service';

@Component({
  selector: 'app-add-post-modal',
  templateUrl: './add-post-modal.component.html',
  styleUrls: ['./add-post-modal.component.scss']
})
export class AddPostModalComponent implements OnInit {

  @Input() isModalOpen!: boolean ;
  @Output() closeModalEmitter = new EventEmitter<void>();
  @Output() postResponseEmitter = new EventEmitter<PostResponse>();

  postForm!: FormGroup; 
  subcriptions: Subscription[] = [];
  isLoading = false;

  constructor( private formBuilder: FormBuilder,
               private postService: PostService,
               private customAlertService: CustomAlertService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.postForm = this.formBuilder.group({
      url: ['', [Validators.required]],
      description: [''],
    });
  }

  savePost() {
    let post: Post = new Post({
      url: this.postForm.value.url,
      content: this.postForm.value.description,
      createdDate: new Date(),
      userId: undefined,
      id: undefined
    });
    
    this.subcriptions.push(this.postService.addPost(post).subscribe({
      next: (postResponse: PostResponse | undefined) => {
        if(postResponse != undefined) {
          this.postResponseEmitter.emit(postResponse);
          this.isLoading = false;
          this.customAlertService.successSnackBar('Post added successfully');
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.customAlertService.genericErrorMessage();
      }
    }));



  }
}
