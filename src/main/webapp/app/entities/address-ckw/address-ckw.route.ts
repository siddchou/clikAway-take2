import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddressCkw } from 'app/shared/model/address-ckw.model';
import { AddressCkwService } from './address-ckw.service';
import { AddressCkwComponent } from './address-ckw.component';
import { AddressCkwDetailComponent } from './address-ckw-detail.component';
import { AddressCkwUpdateComponent } from './address-ckw-update.component';
import { AddressCkwDeletePopupComponent } from './address-ckw-delete-dialog.component';
import { IAddressCkw } from 'app/shared/model/address-ckw.model';

@Injectable({ providedIn: 'root' })
export class AddressCkwResolve implements Resolve<IAddressCkw> {
    constructor(private service: AddressCkwService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((address: HttpResponse<AddressCkw>) => address.body));
        }
        return of(new AddressCkw());
    }
}

export const addressRoute: Routes = [
    {
        path: 'address-ckw',
        component: AddressCkwComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'clikawayApp.address.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'address-ckw/:id/view',
        component: AddressCkwDetailComponent,
        resolve: {
            address: AddressCkwResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clikawayApp.address.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'address-ckw/new',
        component: AddressCkwUpdateComponent,
        resolve: {
            address: AddressCkwResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clikawayApp.address.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'address-ckw/:id/edit',
        component: AddressCkwUpdateComponent,
        resolve: {
            address: AddressCkwResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clikawayApp.address.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const addressPopupRoute: Routes = [
    {
        path: 'address-ckw/:id/delete',
        component: AddressCkwDeletePopupComponent,
        resolve: {
            address: AddressCkwResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clikawayApp.address.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
