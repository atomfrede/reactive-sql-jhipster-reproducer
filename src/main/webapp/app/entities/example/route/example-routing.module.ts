import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ExampleComponent } from '../list/example.component';
import { ExampleDetailComponent } from '../detail/example-detail.component';
import { ExampleUpdateComponent } from '../update/example-update.component';
import { ExampleRoutingResolveService } from './example-routing-resolve.service';

const exampleRoute: Routes = [
  {
    path: '',
    component: ExampleComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ExampleDetailComponent,
    resolve: {
      example: ExampleRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ExampleUpdateComponent,
    resolve: {
      example: ExampleRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ExampleUpdateComponent,
    resolve: {
      example: ExampleRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(exampleRoute)],
  exports: [RouterModule],
})
export class ExampleRoutingModule {}
