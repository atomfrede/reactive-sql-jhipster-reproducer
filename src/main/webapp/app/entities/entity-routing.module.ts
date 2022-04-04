import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'example',
        data: { pageTitle: 'jhipsterApp.example.home.title' },
        loadChildren: () => import('./example/example.module').then(m => m.ExampleModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
