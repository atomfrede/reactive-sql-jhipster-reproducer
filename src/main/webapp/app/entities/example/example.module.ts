import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ExampleComponent } from './list/example.component';
import { ExampleDetailComponent } from './detail/example-detail.component';
import { ExampleUpdateComponent } from './update/example-update.component';
import { ExampleDeleteDialogComponent } from './delete/example-delete-dialog.component';
import { ExampleRoutingModule } from './route/example-routing.module';

@NgModule({
  imports: [SharedModule, ExampleRoutingModule],
  declarations: [ExampleComponent, ExampleDetailComponent, ExampleUpdateComponent, ExampleDeleteDialogComponent],
  entryComponents: [ExampleDeleteDialogComponent],
})
export class ExampleModule {}
