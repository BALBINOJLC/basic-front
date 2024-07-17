import { CalendarModule, DateAdapter as CalendarDateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ApplicationConfig, importProvidersFrom, isDevMode, LOCALE_ID } from '@angular/core';
import { PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading } from '@angular/router';
import { LuxonDateAdapter } from '@angular/material-luxon-adapter';
import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { provideTransloco } from '@ngneat/transloco';
import { TranslocoHttpLoader } from './core/transloco/transloco.http-loader';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideFuse } from '@fuse';
import { provideAuthAPI } from './core/auth/auth.provider';
import { provideIcons } from './core/icons/icons.provider';
import { mockApiServices } from './mock-api';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideStore } from '@ngrx/store';
import { appReducers } from '@store';
import { provideEffects } from '@ngrx/effects';
import { effects } from './store/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { HttpApiInterceptorProvider, appThemeConfig } from '@core';
import { environment } from 'environments/environment';
import { getPerformance, providePerformance } from '@angular/fire/performance';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);

export const appConfig: ApplicationConfig = {
  providers: [
    // Firebase
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    providePerformance(() => getPerformance()),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideAnalytics(() => getAnalytics()),
    provideStorage(() => getStorage()),
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    ScreenTrackingService,
    UserTrackingService,

    provideAnimations(),
    provideHttpClient(withFetch()),
    importProvidersFrom(HttpClientModule),
    HttpApiInterceptorProvider,

    provideRouter(appRoutes, withPreloading(PreloadAllModules), withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })),
    provideClientHydration(),

    // Material Date Adapter
    {
      provide: DateAdapter,
      useClass: LuxonDateAdapter,
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'D',
        },
        display: {
          dateInput: 'DDD',
          monthYearLabel: 'LLL yyyy',
          dateA11yLabel: 'DD',
          monthYearA11yLabel: 'LLLL yyyy',
        },
      },
    },
    { provide: LOCALE_ID, useValue: 'es' },

    // Transloco Config
    provideTransloco({
      config: {
        availableLangs: [
          { id: 'en', label: 'English' },
          { id: 'es', label: 'Spanish' },
          { id: 'tr', label: 'Turkish' },
        ],
        defaultLang: 'es',
        fallbackLang: 'es',
        reRenderOnLangChange: true,
        prodMode: true,
      },
      loader: TranslocoHttpLoader,
    }),

    // Fuse
    provideAuthAPI(),
    provideIcons(),
    provideFuse({
      mockApi: {
        delay: 0,
        services: mockApiServices,
      },
      fuse: appThemeConfig,
    }),

    provideAnimationsAsync(),
    provideStore(appReducers),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(effects),
    provideRouterStore(),

    // Angular Calendar
    importProvidersFrom(
      CalendarModule.forRoot({
        provide: CalendarDateAdapter,
        useFactory: adapterFactory,
      })
    ),
  ],
};
