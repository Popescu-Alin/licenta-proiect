import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RepoUserBasicInfo } from '../../client/client';
import { RepoService } from '../../services/repo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomAlertService } from '../../services/custom-alert.service';
import { UrlUtil } from '../../utils/url-util';

@Component({
  selector: 'app-show-edit-delete-repo-user',
  templateUrl: './show-edit-delete-repo-user.component.html',
  styleUrls: ['./show-edit-delete-repo-user.component.scss'],
})
export class ShowEditDeleteRepoUserComponent implements OnInit {
  @Input() user!: RepoUserBasicInfo;
  @Input() canEdit: boolean = false;
  @Input() repoId!: string;
  @Output() removedUserIdEmitter = new EventEmitter<string>();

  urlUtil = UrlUtil
  isEditModeOpen: boolean = false;
  isLoading: boolean = false;

  userForm!: FormGroup;

  constructor(
    private repoService: RepoService,
    private formBuilder: FormBuilder,
    private alertService: CustomAlertService
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      userPrivilage: [this.user.userPrivileges!, [Validators.required]],
    });
  }

  resetForm() {
    this.userForm.get('userPrivilage')?.setValue(this.user.userPrivileges!);
  }

  async deleteUser() {
    this.isLoading = true;
    try {
      await this.repoService.removeRepoUser(this.repoId, this.user.userID!);
      this.removedUserIdEmitter.emit(this.user.userID!);
      this.alertService.successSnackBar('User removed successfully!');
    } catch {
      this.alertService.genericErrorMessage();
    } finally {
      this.isLoading = false;
    }
  }

  editUser() {
    this.isEditModeOpen = true;
  }

  async saveChanges() {
    let backupRole = this.user.userPrivileges;
    this.user.userPrivileges = this.userForm.get('userPrivilage')?.value;
    this.isLoading = true;
    try {
      await this.repoService.updateRepoUser(this.user);
      this.alertService.successSnackBar('User removed successfully!');
    } catch {
      this.alertService.genericErrorMessage();
      this.user.userPrivileges = backupRole;
    } finally {
      this.isLoading = false;
    }
    this.isEditModeOpen = false;
  }

  cancelChanges() {
    this.isEditModeOpen = false;
    this.resetForm();
  }
}
