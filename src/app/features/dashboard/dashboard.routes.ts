import { Routes } from '@angular/router';
import { ExampleComponent } from 'app/features/dashboard/dashboard.component';

export default [
  {
    path: '',
    component: ExampleComponent,
  },
  {
    path: 'dashboard',
    component: ExampleComponent,
  },
] as Routes;
