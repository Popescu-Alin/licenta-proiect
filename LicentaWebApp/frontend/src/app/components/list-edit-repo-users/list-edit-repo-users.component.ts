import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  BasicUserInfo,
  RepoUserBasicInfo,
  UserRepository,
} from '../../client/client';
import { RepoService } from '../../services/repo.service';
import { CustomAlertService } from '../../services/custom-alert.service';
import { DataReciverService } from '../../services/data-reciver.service';
import { Privilages } from '../../constants/constants';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-list-edit-repo-users',
  templateUrl: './list-edit-repo-users.component.html',
  styleUrls: ['./list-edit-repo-users.component.scss'],
})
export class ListEditRepoUsersComponent implements OnInit {
  @Input() isModalOpen!: boolean;
  @Input() repoId!: string;
  @Input() ownerId!: string;
  @Output() closeModalEmitter = new EventEmitter<void>();
  @Output() userNumberUpdateEmitter = new EventEmitter<number>();

  isLoading = false;
  isLoadingSearch: boolean = false;
  isOwner: boolean = false;
  isAddUserMenuOpen: boolean = false;

  isAlreadyAdded: boolean[] = [];

  repoUserBasicInfos: RepoUserBasicInfo[] | undefined;
  userBasicInfos: BasicUserInfo[] = [];
  appUserId: string | undefined;
  privileges = Privilages;

  constructor(
    private repoService: RepoService,
    private alertService: CustomAlertService,
    private dataReciverService: DataReciverService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.appUserId = this.dataReciverService.getUserData()?.userId;
    this.isOwner =
      this.dataReciverService.getUserData()?.userId == this.ownerId;
    this.loadRepoUsers();
  }

  async loadRepoUsers() {
    this.isLoading = true;
    try {
      this.repoUserBasicInfos = await this.repoService.getRepoUsers(
        this.repoId
      );
    } catch {
      this.alertService.genericErrorMessage();
    } finally {
      this.isLoading = false;
    }
  }

  openCloseAddUserMenu() {
    this.isAddUserMenuOpen = !this.isAddUserMenuOpen;
  }

  async search(string: string) {
    this.isLoadingSearch = true;
    try {
      this.userBasicInfos =
        (await this.userService.searchForUser(string)) ?? [];
      this.reloadTheBoolList();
    } catch {
      this.alertService.genericErrorMessage();
    } finally {
      this.isLoadingSearch = false;
    }
  }

  addUserToRepo(user: BasicUserInfo) {
    let userRepo: UserRepository = new UserRepository({
      userId: user.userId,
      repositoryId: this.repoId,
      privileges: Privilages.ViewOnly,
    });
    let userRepoBasicInfo: RepoUserBasicInfo = new RepoUserBasicInfo({
      userID: user.userId,
      userPrivileges: Privilages.ViewOnly,
      imageURL: user.imageURL,
      userName: user.userName
    });
    try {
      this.repoService.addRepoUser(userRepo);
      this.repoUserBasicInfos?.push(userRepoBasicInfo);
      this.userNumberUpdateEmitter.emit(this.repoUserBasicInfos?.length ?? 0);
      this.reloadTheBoolList();
    } catch {
      this.alertService.genericErrorMessage();
    } finally {
    }
  }

  removeUser(userId: string) {
    this.repoUserBasicInfos = this.repoUserBasicInfos?.filter(
      (user) => user.userID !== userId
    );
    this.reloadTheBoolList();
    this.userNumberUpdateEmitter.emit(this.repoUserBasicInfos?.length ?? 0);
  }

  reloadTheBoolList(){
    if(!this.userBasicInfos || this.userBasicInfos.length == 0){
      return;
    }
    this.isAlreadyAdded = Array(this.userBasicInfos.length).fill(false);
    this.userBasicInfos.forEach((user, index) => {
      this.repoUserBasicInfos?.forEach((repoUser) => {
        if (user.userId == repoUser.userID) {
          this.isAlreadyAdded[index] = true;
        }
      });
    });
  }
}
