import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IExample, getExampleIdentifier } from '../example.model';

export type EntityResponseType = HttpResponse<IExample>;
export type EntityArrayResponseType = HttpResponse<IExample[]>;

@Injectable({ providedIn: 'root' })
export class ExampleService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/examples');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(example: IExample): Observable<EntityResponseType> {
    return this.http.post<IExample>(this.resourceUrl, example, { observe: 'response' });
  }

  update(example: IExample): Observable<EntityResponseType> {
    return this.http.put<IExample>(`${this.resourceUrl}/${getExampleIdentifier(example) as number}`, example, { observe: 'response' });
  }

  partialUpdate(example: IExample): Observable<EntityResponseType> {
    return this.http.patch<IExample>(`${this.resourceUrl}/${getExampleIdentifier(example) as number}`, example, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IExample>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IExample[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addExampleToCollectionIfMissing(exampleCollection: IExample[], ...examplesToCheck: (IExample | null | undefined)[]): IExample[] {
    const examples: IExample[] = examplesToCheck.filter(isPresent);
    if (examples.length > 0) {
      const exampleCollectionIdentifiers = exampleCollection.map(exampleItem => getExampleIdentifier(exampleItem)!);
      const examplesToAdd = examples.filter(exampleItem => {
        const exampleIdentifier = getExampleIdentifier(exampleItem);
        if (exampleIdentifier == null || exampleCollectionIdentifiers.includes(exampleIdentifier)) {
          return false;
        }
        exampleCollectionIdentifiers.push(exampleIdentifier);
        return true;
      });
      return [...examplesToAdd, ...exampleCollection];
    }
    return exampleCollection;
  }
}
