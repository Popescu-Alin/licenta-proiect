import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../components/compoments.module';
import { PostPageComponent } from './post-page.component';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule
  ],
  declarations: [PostPageComponent],
})
export class PostPageModule { }
