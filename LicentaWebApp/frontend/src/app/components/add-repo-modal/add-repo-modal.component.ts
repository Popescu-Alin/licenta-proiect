import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RepoService } from '../../services/repo.service';
import { CustomAlertService } from '../../services/custom-alert.service';
import { Repository, RepositoryResponse } from '../../client/client';
import { AccessModifiers } from '../../constants/constants';

@Component({
  selector: 'app-add-repo-modal',
  templateUrl: './add-repo-modal.component.html',
  styleUrls: ['./add-repo-modal.component.scss'],
})
export class AddRepoModalComponent implements OnInit {
  @Input() isModalOpen!: boolean ;
  @Output() closeModalEmitter = new EventEmitter<void>();
  @Output() repositoryEmitter = new EventEmitter<Repository>();

  repoForm!: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private repoService: RepoService,
    private customAlertService: CustomAlertService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.repoForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      accessModifier: [AccessModifiers.Public, [Validators.required]],
    });
  }

  async addRepo() {
    let repo: Repository = new Repository({
      id: undefined,
      title: this.repoForm.value.title,
      accessModifier: this.repoForm.value.accessModifier,
    });

    try {
      this.isLoading = true;
      let newRepo: Repository | undefined =
        await this.repoService.addRepo(repo);
      if (newRepo) {
        this.repositoryEmitter.emit(newRepo);
        this.customAlertService.successSnackBar('Repository added successfully!');
      }
     
    } catch (error) {
      this.customAlertService.genericErrorMessage();
    } finally {
      this.isLoading = false;
      this.repoForm.reset();
      this.initForm();
    }
  }

}
