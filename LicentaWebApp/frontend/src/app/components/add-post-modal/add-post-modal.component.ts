import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddPostDto, FileParameter, PostResponse, UploadImageResponse } from '../../client/client';
import { PostService } from '../../services/post.service';
import { CustomAlertService } from '../../services/custom-alert.service';
import { FileParameterClass } from '../../utils/helper-class';

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
  isLoading = false;
  isImageSelected: boolean = false;
  image: Blob | undefined;
  imageSrc: string | ArrayBuffer | null = null;

  constructor( private formBuilder: FormBuilder,
               private postService: PostService,
               private customAlertService: CustomAlertService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.postForm = this.formBuilder.group({
      description: [''],
    });
  }

  async savePost() {
    let post: AddPostDto = new AddPostDto({
      content: this.postForm.value.description,
      userId: undefined,
      fileName: "image.jpg",
    });
    let fp: FileParameter = new FileParameterClass(
       this.image,
      "image.jpg",
    );
    this.isLoading = true;
    try{
      let imageResponse: UploadImageResponse | undefined = await this.postService.uploadPostImage(fp);
      if(!(imageResponse && imageResponse.response)) {
        throw new Error();
      }
      post.fileName = imageResponse.response;
      let postResponse = await this.postService.addPost(post);
      if(postResponse != undefined) {
        this.postResponseEmitter.emit(postResponse);
        this.isLoading = false;
        this.customAlertService.successSnackBar('Post added successfully');
      }
    }catch(error){
      this.customAlertService.genericErrorMessage();
    }finally{
      this.isLoading = false;
    }
  }

  useImage(image: Blob) {
      this.isImageSelected = true;
      this.imageSrc = URL.createObjectURL(image);
      this.image = image;
  }
}
