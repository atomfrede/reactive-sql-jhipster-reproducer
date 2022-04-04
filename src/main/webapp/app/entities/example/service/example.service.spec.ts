import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IExample, Example } from '../example.model';

import { ExampleService } from './example.service';

describe('Example Service', () => {
  let service: ExampleService;
  let httpMock: HttpTestingController;
  let elemDefault: IExample;
  let expectedResult: IExample | IExample[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ExampleService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      name: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Example', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Example()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Example', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          name: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Example', () => {
      const patchObject = Object.assign(
        {
          name: 'BBBBBB',
        },
        new Example()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Example', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          name: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Example', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addExampleToCollectionIfMissing', () => {
      it('should add a Example to an empty array', () => {
        const example: IExample = { id: 123 };
        expectedResult = service.addExampleToCollectionIfMissing([], example);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(example);
      });

      it('should not add a Example to an array that contains it', () => {
        const example: IExample = { id: 123 };
        const exampleCollection: IExample[] = [
          {
            ...example,
          },
          { id: 456 },
        ];
        expectedResult = service.addExampleToCollectionIfMissing(exampleCollection, example);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Example to an array that doesn't contain it", () => {
        const example: IExample = { id: 123 };
        const exampleCollection: IExample[] = [{ id: 456 }];
        expectedResult = service.addExampleToCollectionIfMissing(exampleCollection, example);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(example);
      });

      it('should add only unique Example to an array', () => {
        const exampleArray: IExample[] = [{ id: 123 }, { id: 456 }, { id: 12466 }];
        const exampleCollection: IExample[] = [{ id: 123 }];
        expectedResult = service.addExampleToCollectionIfMissing(exampleCollection, ...exampleArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const example: IExample = { id: 123 };
        const example2: IExample = { id: 456 };
        expectedResult = service.addExampleToCollectionIfMissing([], example, example2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(example);
        expect(expectedResult).toContain(example2);
      });

      it('should accept null and undefined values', () => {
        const example: IExample = { id: 123 };
        expectedResult = service.addExampleToCollectionIfMissing([], null, example, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(example);
      });

      it('should return initial array if no Example is added', () => {
        const exampleCollection: IExample[] = [{ id: 123 }];
        expectedResult = service.addExampleToCollectionIfMissing(exampleCollection, undefined, null);
        expect(expectedResult).toEqual(exampleCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
