import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { DataReciverService } from '../../services/data-reciver.service';
import { CustomAlertService } from '../../services/custom-alert.service';
import { RepoService } from '../../services/repo.service';
import { AddToRepoResponse, LogInTokenRepsone } from '../../client/client';
import { AccessModifiers } from '../../constants/constants';
import { UrlUtil } from '../../utils/url-util';

@Component({
  selector: 'app-save-post-panel',
  templateUrl: './save-post-panel.component.html',
  styleUrls: ['./save-post-panel.component.scss'],
})
export class SavePostPanelComponent implements OnInit {
  @Input() isModalOpen!: boolean;
  @Input() postId!: string;
  @Output() closeModalEmitter = new EventEmitter<void>();
  @Output() responseEmitter = new EventEmitter<boolean>();


  accessModifiers = AccessModifiers
  isLoading = false;
  isActionLoading = false;
  addToRepoResponses: AddToRepoResponse[] | undefined;
  userData: LogInTokenRepsone | undefined;
  urlUtil = UrlUtil
  constructor(
    private dataReciver: DataReciverService,
    private customAlertService: CustomAlertService,
    private repositoryService: RepoService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.userData = this.dataReciver.getUserData();
    this.loadRepos();
  }

  async loadRepos() {
    if(!(this.userData && this.userData.userId)){
      return;
    }
    this.isLoading = true;
    try {
      this.addToRepoResponses = await this.repositoryService.getAccessibleRepos(this.userData.userId,this.postId);
    } catch (error) {
      this.customAlertService.genericErrorMessage();
      this.addToRepoResponses = undefined;
    } finally {
      this.isLoading = false;
      this.changeDetectorRef.detectChanges();
    }
  }

  async addToRepo(repoId: string) {
    
    this.isActionLoading = true;
    try {
      await this.repositoryService.addPostToRepo(repoId, this.postId);
      this.customAlertService.successSnackBar('Added successfully!');
      this.setAsSaved(repoId);
      this.responseEmitter.emit(true);
    } catch (error) {
      this.customAlertService.genericErrorMessage();
    } finally {
      this.isActionLoading = false;
      this.changeDetectorRef.detectChanges();
    }
  }

  async removeFromRepo(repoId: string) {
    this.isActionLoading = true;
    try {
      await this.repositoryService.removePostFromRepo(repoId, this.postId);
      this.customAlertService.successSnackBar('Removed successfully!');
      this.setAsNotSaved(repoId);
      this.responseEmitter.emit(this.remainedSaved());
    } catch (error) {
      this.customAlertService.genericErrorMessage();
    } finally {
      this.isActionLoading = false;
      this.changeDetectorRef.detectChanges();
    }
  }

  setAsNotSaved(repoId: string) {
    const repo = this.addToRepoResponses?.find((repo) => repo.repository?.id === repoId);
    if (repo) {
      repo.isPostSavedInRepo = false;
      repo.numberOfPosts! -= 1;
    }
  }

  setAsSaved(repoId: string) {
    const repo = this.addToRepoResponses?.find((repo) => repo.repository?.id === repoId);
    if (repo) {
      repo.isPostSavedInRepo = true;
      repo.numberOfPosts! += 1;
    }
  }

  remainedSaved(): boolean{
    return this.addToRepoResponses?.some((repo) => repo.isPostSavedInRepo) ?? false;
  }
}
