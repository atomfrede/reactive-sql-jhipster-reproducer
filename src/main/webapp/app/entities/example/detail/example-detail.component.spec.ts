import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ExampleDetailComponent } from './example-detail.component';

describe('Example Management Detail Component', () => {
  let comp: ExampleDetailComponent;
  let fixture: ComponentFixture<ExampleDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExampleDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ example: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ExampleDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ExampleDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load example on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.example).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
