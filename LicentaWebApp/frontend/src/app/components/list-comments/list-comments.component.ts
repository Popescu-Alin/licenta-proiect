import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { MainCommentResponse, MainCommmentResposeCollection, Comment, BasicUserInfo } from '../../client/client';
import { CustomAlertService } from '../../services/custom-alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UrlUtil } from '../../utils/url-util';
import { DataReciverService } from '../../services/data-reciver.service';

@Component({
  selector: 'app-list-comments',
  templateUrl: './list-comments.component.html',
  styleUrls: ['./list-comments.component.scss']
})
export class ListCommentsComponent implements OnInit {

  @Input() postId!: string;
  @Output() updateCOmmentNumber: EventEmitter<number> = new EventEmitter<number>();
  form!: FormGroup; 
  mainComments: MainCommmentResposeCollection | undefined;

  isLoading: boolean = false;
  userInfo: BasicUserInfo | undefined;

  urlUtil = UrlUtil
  
  constructor(private commentService: CommentService,
              private alertSercice: CustomAlertService,
              private formBuider: FormBuilder,
              private dataService: DataReciverService,
   ) { }

  ngOnInit() {
    this.loadMainComments();
    this.initForm();
    this.userInfo = this.dataService.getUserBasicInfo();
  }

  initForm() {
    this.form = this.formBuider.group({
      comment: ['', Validators.required],
    });
  }

  async loadMainComments() {
    this.isLoading = true;
    try {
      this.mainComments = await this.commentService.getMainCommnets(this.postId, 99999, 0);
    } catch (error) {
      this.alertSercice.genericErrorMessage();
    } finally {
      this.isLoading = false;
    }
  }

  async addComment() {
    if (!this.form.valid) {
      return;
    }

    let comment: Comment = new Comment({
      id: undefined,
      content: this.form.get('comment')?.value,
      date: new Date(),
      postId: this.postId,
      userId: undefined,
      parentCommetId: undefined
    });
    let MainComment: MainCommentResponse = new MainCommentResponse({
      comment: comment,
      userInfo: this.userInfo,
      subcommentsNumber: 0,
    });

    try{
      MainComment.comment = await this.commentService.addComment(this.postId, comment);
    }catch{

    }

    this.mainComments?.collection?.unshift(MainComment);
    this.mainComments!.totalCount! += 1

    this.updateCOmmentNumber.emit(1);
    this.form.reset();
  }

  async deleteComment(commentId: string) {
    try {
      await this.commentService.deleteComment(commentId);
      this.mainComments!.collection = this.mainComments?.collection?.filter((c) => c.comment?.id !== commentId);
      this.mainComments!.totalCount! -= 1;
      this.updateCOmmentNumber.emit(-1);
    } catch (error) {
    }
  }
}

