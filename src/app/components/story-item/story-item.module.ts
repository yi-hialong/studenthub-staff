import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoryItemComponent} from './story-item.component';
import {PipesModule} from 'src/app/pipes/pipes.module';


@NgModule({
  declarations: [
    StoryItemComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
  ],
  exports: [
    StoryItemComponent
  ]
})
export class StoryItemModule {
}

