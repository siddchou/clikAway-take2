import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContractorCkw } from 'app/shared/model/contractor-ckw.model';
import { ContractorCkwService } from './contractor-ckw.service';
import { ContractorCkwComponent } from './contractor-ckw.component';
import { ContractorCkwDetailComponent } from './contractor-ckw-detail.component';
import { ContractorCkwUpdateComponent } from './contractor-ckw-update.component';
import { ContractorCkwDeletePopupComponent } from './contractor-ckw-delete-dialog.component';
import { IContractorCkw } from 'app/shared/model/contractor-ckw.model';

@Injectable({ providedIn: 'root' })
export class ContractorCkwResolve implements Resolve<IContractorCkw> {
    constructor(private service: ContractorCkwService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((contractor: HttpResponse<ContractorCkw>) => contractor.body));
        }
        return of(new ContractorCkw());
    }
}

export const contractorRoute: Routes = [
    {
        path: 'contractor-ckw',
        component: ContractorCkwComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'clikawayApp.contractor.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'contractor-ckw/:id/view',
        component: ContractorCkwDetailComponent,
        resolve: {
            contractor: ContractorCkwResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clikawayApp.contractor.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'contractor-ckw/new',
        component: ContractorCkwUpdateComponent,
        resolve: {
            contractor: ContractorCkwResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clikawayApp.contractor.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'contractor-ckw/:id/edit',
        component: ContractorCkwUpdateComponent,
        resolve: {
            contractor: ContractorCkwResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clikawayApp.contractor.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const contractorPopupRoute: Routes = [
    {
        path: 'contractor-ckw/:id/delete',
        component: ContractorCkwDeletePopupComponent,
        resolve: {
            contractor: ContractorCkwResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clikawayApp.contractor.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
