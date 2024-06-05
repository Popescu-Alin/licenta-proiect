import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { MainCommentResponse, MainCommmentResposeCollection, Comment } from '../../client/client';
import { CustomAlertService } from '../../services/custom-alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-comments',
  templateUrl: './list-comments.component.html',
  styleUrls: ['./list-comments.component.scss']
})
export class ListCommentsComponent implements OnInit {

  @Input() postId!: string;

  form!: FormGroup; 
  mainComments: MainCommmentResposeCollection | undefined;

  isLoading: boolean = false;

  constructor(private commentService: CommentService,
              private alertSercice: CustomAlertService,
              private formBuider: FormBuilder,
   ) { }

  ngOnInit() {
    this.loadMainComments();
    this.initForm();
  }

  initForm() {
    this.form = this.formBuider.group({
      comment: ['', Validators.required],
    });
  }

  async loadMainComments() {
    this.isLoading = true;
    try {
      this.mainComments = await this.commentService.getMainCommnets(this.postId, 10, 0);
    } catch (error) {
      this.alertSercice.genericErrorMessage();
    } finally {
      this.isLoading = false;
    }
  }

  addComment() {
    console.log(this.form.get('comment')?.value);
    let comment: Comment = new Comment({
      id: '',
      content: this.form.get('comment')?.value,
      date: new Date(),
      postId: this.postId,
      userId: '',
      parentCommetId: undefined
    });
    let MainComment: MainCommentResponse = new MainCommentResponse({
      comment: comment,
      userInfo:undefined,
      subcommentsNumber: 0,
    });

    this.mainComments?.collection?.unshift(MainComment);
    this.mainComments!.totalCount! += 1
    console.log(this.mainComments);
  }

}
