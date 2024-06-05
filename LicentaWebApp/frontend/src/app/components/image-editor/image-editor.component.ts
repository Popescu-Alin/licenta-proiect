import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-image-editor',
  templateUrl: './image-editor.component.html',
  styleUrls: ['./image-editor.component.scss'],
})
export class ImageEditorComponent implements OnInit {
  @Input() allowPreview: boolean = false;
  @Output() imageEmitter: EventEmitter<Blob> = new EventEmitter<Blob>();
  @Output() imagePreview: EventEmitter<Blob> = new EventEmitter<Blob>();

  constructor() {}
  
  imageEditor: any;
  isAnImageUploaded: boolean = false;
  image: Blob | undefined;

  ngOnInit() {}

  @ViewChild('tuiImageEditor') imageEditorContainer!: ElementRef;
  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      import('tui-image-editor').then((ImageEditorModule) => {
        const ImageEditor = ImageEditorModule.default;
        this.imageEditor = new ImageEditor(
          this.imageEditorContainer.nativeElement,
          {
            includeUI: {
              loadImage: {
                path: 'assets/bg.jpg',
                name: 'SampleImage',
              },
              theme: {},
              menuBarPosition: 'bottom',
            },
            cssMaxWidth: 600,
            cssMaxHeight: 500,
            selectionStyle: {
              cornerSize: 20,
              rotatingPointOffset: 70,
            },
          }
        );
      });
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageEditor
          .loadImageFromURL(e.target.result, file.name)
          .then(() => {
            this.imageEditor.clearUndoStack();
          });
      };
      reader.readAsDataURL(file);
      this.isAnImageUploaded = true;
    }
    else {
      this.isAnImageUploaded = false;
    }
  }

  useImage(): void {
    if (this.imageEditor) {
      const dataURL = this.imageEditor.toDataURL({ format: 'png', quality: 1 });
      const blob = this.dataURLtoBlob(dataURL);
      this.imageEmitter.emit(blob);
    }
  }

  saveImage(): void {
    if (this.imageEditor) {
      const dataURL = this.imageEditor.toDataURL({ format: 'png', quality: 1 });
      const blob = this.dataURLtoBlob(dataURL);
      saveAs(blob, this.imageEditor.getImageName() + '.png');
    }
  }

  dataURLtoBlob(dataURL: string): Blob {
    const byteString = atob(dataURL.split(',')[1]); //save the content
    const type = 'image/png'; //image type
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([uint8Array], { type: type });
  }

  enitPreviewImage(){
    if (this.imageEditor) {
      const dataURL = this.imageEditor.toDataURL({ format: 'png', quality: 1 });
      const blob = this.dataURLtoBlob(dataURL);
      this.imagePreview.emit(blob);
    }
  }
}
