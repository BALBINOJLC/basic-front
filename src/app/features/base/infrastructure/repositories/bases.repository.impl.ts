import { Observable } from 'rxjs';
import { IResponseBaseDeleted, IResposeGetBases, IBase, IQueryBase, IQueryBases, BasesRepository, IBaseUpdate } from '../../domain';
import { BasesApiRestDataSource } from '../datasources';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BasesRepositoryImpl implements BasesRepository {
  constructor(private dataSource: BasesApiRestDataSource) {
    this.dataSource = dataSource;
  }
  getBases(params: IQueryBases): Observable<IResposeGetBases> {
    return this.dataSource.getBases(params);
  }

  searchBases(params: IQueryBases, regexp: string): Observable<IResposeGetBases> {
    return this.dataSource.searchBases(params, regexp);
  }
  getBase(params: IQueryBase): Observable<IBase> {
    return this.dataSource.getBase(params);
  }
  addBase(data: IBase): Observable<IBase> {
    return this.dataSource.addBase(data);
  }
  deleteBase(id: string): Observable<IResponseBaseDeleted> {
    return this.dataSource.deleteBase(id);
  }
  updateBase(id: string, data: IBaseUpdate): Observable<IBase> {
    return this.dataSource.updateBase(id, data);
  }
}
