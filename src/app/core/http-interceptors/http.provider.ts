import { Provider } from '@angular/core';

// Injection token for the Http Interceptors multi-provider
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpApiInterceptor } from './http.interceptor';

/** Provider for the Noop Interceptor. */
export const HttpApiInterceptorProvider: Provider = { provide: HTTP_INTERCEPTORS, useClass: HttpApiInterceptor, multi: true };
