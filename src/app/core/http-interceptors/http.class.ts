import { HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class HttpHandler {
  abstract handle(req: HttpRequest<unknown>): Observable<HttpEvent<unknown>>;
}
