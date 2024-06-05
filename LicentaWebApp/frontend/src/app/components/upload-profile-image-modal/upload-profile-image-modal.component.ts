import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CustomAlertService } from '../../services/custom-alert.service';
import { FileParameter, UploadImageResponse } from '../../client/client';
import { FileParameterClass } from '../../utils/helper-class';
import { DataReciverService } from '../../services/data-reciver.service';

@Component({
  selector: 'app-upload-profile-image-modal',
  templateUrl: './upload-profile-image-modal.component.html',
  styleUrls: ['./upload-profile-image-modal.component.scss'],
})
export class UploadProfileImageModalComponent implements OnInit {
  @Input() isModalOpen!: boolean;
  @Output() closeModalEmitter = new EventEmitter<void>();
  @Output() newImageURLEmitter = new EventEmitter<string>();

  isLoading = false;
  isImageSelected: boolean = false;
  image: Blob | undefined;
  imageSrc: string | ArrayBuffer | null = null;

  previewImage: Blob | undefined;
  previewImageSrc: string | ArrayBuffer | null = null;
  isPreviewOpen: boolean = false;

  constructor(
    private userService: UserService,
    private customAlertService: CustomAlertService,
  ) {}

  ngOnInit() {}

  useImage(image: Blob) {
    this.isImageSelected = true;
    this.imageSrc = URL.createObjectURL(image);
    this.image = image;
  }

  async uploadImage() {
    
    let fp: FileParameter = new FileParameterClass(this.image, 'image.jpg');
    this.isLoading = true;
    try {
      let response: UploadImageResponse | undefined = await this.userService.uploadProfileImage(fp);
      if(response && response.response){
        this.newImageURLEmitter.emit(response.response);
      }
      this.customAlertService.successSnackBar('Image uploaded successfully');
      this.closeModalEmitter.emit();
    } catch (error) {
      this.customAlertService.genericErrorMessage();
    } finally {
      this.isLoading = false;
    }
  }

  cancel() {
    this.closeModalEmitter.emit();
  }

  setImagePreview(event: Blob) {
    this.previewImage = event;
    this.previewImageSrc = URL.createObjectURL(event);
    this.isPreviewOpen = true;
  }

  closePrieview() {
    this.isPreviewOpen = false;
  }
}
