import { NgModule } from '@angular/core';
import { CardComponent } from './card/card';
import { GameheaderComponent } from './gameheader/gameheader';
@NgModule({
	declarations: [CardComponent,
    GameheaderComponent],
	imports: [],
	exports: [CardComponent,
    GameheaderComponent]
})
export class ComponentsModule {}
