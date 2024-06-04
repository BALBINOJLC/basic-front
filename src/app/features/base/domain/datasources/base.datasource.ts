import { Observable } from 'rxjs';
import { IResponseBaseDeleted, IResposeGetBases, IBase, IQueryBase, IQueryBases, IBaseUpdate } from '../interfaces';

export abstract class BasesDataSource {
  abstract getBases(params: IQueryBases): Observable<IResposeGetBases>;

  abstract searchBases(params: IQueryBases, regexp: string): Observable<IResposeGetBases>;

  abstract getBase(params: IQueryBase): Observable<IBase>;

  abstract addBase(data: IBase): Observable<IBase>;

  abstract updateBase(id: string, data: IBaseUpdate): Observable<IBase>;

  abstract deleteBase(id: string): Observable<IResponseBaseDeleted>;
}
