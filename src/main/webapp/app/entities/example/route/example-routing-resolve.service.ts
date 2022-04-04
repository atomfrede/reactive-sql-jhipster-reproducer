import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IExample, Example } from '../example.model';
import { ExampleService } from '../service/example.service';

@Injectable({ providedIn: 'root' })
export class ExampleRoutingResolveService implements Resolve<IExample> {
  constructor(protected service: ExampleService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IExample> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((example: HttpResponse<Example>) => {
          if (example.body) {
            return of(example.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Example());
  }
}
