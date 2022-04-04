import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IExample, Example } from '../example.model';
import { ExampleService } from '../service/example.service';

@Component({
  selector: 'jhi-example-update',
  templateUrl: './example-update.component.html',
})
export class ExampleUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [],
  });

  constructor(protected exampleService: ExampleService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ example }) => {
      this.updateForm(example);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const example = this.createFromForm();
    if (example.id !== undefined) {
      this.subscribeToSaveResponse(this.exampleService.update(example));
    } else {
      this.subscribeToSaveResponse(this.exampleService.create(example));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExample>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(example: IExample): void {
    this.editForm.patchValue({
      id: example.id,
      name: example.name,
    });
  }

  protected createFromForm(): IExample {
    return {
      ...new Example(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
    };
  }
}
