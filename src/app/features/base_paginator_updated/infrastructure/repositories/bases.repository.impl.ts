/* eslint-disable @typescript-eslint/naming-convention */
import { Observable } from 'rxjs';
import { IResponseBaseDeleted, IResponseGetBases, IBase, IQueryBase, IQueryBases, BasesRepository, IBaseUpdate } from '../../domain';
import { BasesApiRestDataSource } from '../datasources';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BasesRepositoryImpl implements BasesRepository {
  constructor(private dataSource: BasesApiRestDataSource) {
    this.dataSource = dataSource;
  }
  getBases(params: IQueryBases): Observable<IResponseGetBases> {
    return this.dataSource.getBases(params);
  }

  searchBases(params: IQueryBases, regexp: string): Observable<IResponseGetBases> {
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

  deleteBaseGallery(id_file: string): Observable<IResponseBaseDeleted> {
    return this.dataSource.deleteGalleryBase(id_file);
  }

  deleteBasePromo(base_promo: string, base_simple: string): Observable<IResponseBaseDeleted> {
    return this.dataSource.deleteBasePromo(base_promo, base_simple);
  }
  updateBase(id: string, data: IBaseUpdate): Observable<IBase> {
    return this.dataSource.updateBase(id, data);
  }
}
