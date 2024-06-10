import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UrlUtil } from '../../utils/url-util';
import { MainCommentResponse } from '../../client/client';
import { DataReciverService } from '../../services/data-reciver.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  urlUtil = UrlUtil;
  isEditMode: boolean = false;

  form: FormGroup = new FormGroup({});

  appUserID: string | undefined;

  @Input() comment!: MainCommentResponse;
  @Output() deletedComment: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private dataReciver: DataReciverService,
    private formBuilder: FormBuilder,
    private commentService: CommentService
  ) {
    this.appUserID = this.dataReciver.getApplicationUserId();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      comment: [this.comment.comment?.content, Validators.required],
    });
  }

  openEditMode() {
    this.isEditMode = true;
  }

  cancel() {
    this.isEditMode = false;
    this.form = this.formBuilder.group({
      comment: [this.comment.comment?.content, Validators.required],
    });
  }

  async saveChanges() {
    if (!this.form.valid) {
      return;
    }
    this.comment!.comment!.content = this.form.value.comment;
    try{
       await this.commentService.editComment(this.comment.comment!.id!,this.comment.comment!)
      this.isEditMode = false;
    }catch{

    }

  }

  deleteComment() {
    this.deletedComment.emit(this.comment.comment?.id!);
  }
}
