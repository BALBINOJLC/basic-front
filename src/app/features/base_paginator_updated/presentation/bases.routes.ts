import { Routes } from '@angular/router';
import { BasesComponent } from './bases.component';
import { MainComponent } from './main/main.component';
import { DetailsComponent } from './details/details.component';
import { CanDeactivateClientsDetails } from './module.guards';

export default [
  {
    path: '',
    component: BasesComponent,
    children: [
      {
        path: '',
        component: MainComponent,
        children: [
          {
            path: ':id',
            component: DetailsComponent,
            canDeactivate: [CanDeactivateClientsDetails],
          },
        ],
      },
    ],
  },
] as Routes;
