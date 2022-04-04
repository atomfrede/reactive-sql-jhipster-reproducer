import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IExample } from '../example.model';
import { ExampleService } from '../service/example.service';

@Component({
  templateUrl: './example-delete-dialog.component.html',
})
export class ExampleDeleteDialogComponent {
  example?: IExample;

  constructor(protected exampleService: ExampleService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.exampleService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
