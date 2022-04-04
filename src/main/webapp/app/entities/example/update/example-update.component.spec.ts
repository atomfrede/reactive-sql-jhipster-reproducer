import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ExampleService } from '../service/example.service';
import { IExample, Example } from '../example.model';

import { ExampleUpdateComponent } from './example-update.component';

describe('Example Management Update Component', () => {
  let comp: ExampleUpdateComponent;
  let fixture: ComponentFixture<ExampleUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let exampleService: ExampleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ExampleUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ExampleUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ExampleUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    exampleService = TestBed.inject(ExampleService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const example: IExample = { id: 456 };

      activatedRoute.data = of({ example });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(example));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Example>>();
      const example = { id: 123 };
      jest.spyOn(exampleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ example });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: example }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(exampleService.update).toHaveBeenCalledWith(example);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Example>>();
      const example = new Example();
      jest.spyOn(exampleService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ example });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: example }));
      saveSubject.complete();

      // THEN
      expect(exampleService.create).toHaveBeenCalledWith(example);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Example>>();
      const example = { id: 123 };
      jest.spyOn(exampleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ example });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(exampleService.update).toHaveBeenCalledWith(example);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
