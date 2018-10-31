import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaymentCkw } from 'app/shared/model/payment-ckw.model';
import { PaymentCkwService } from './payment-ckw.service';
import { PaymentCkwComponent } from './payment-ckw.component';
import { PaymentCkwDetailComponent } from './payment-ckw-detail.component';
import { PaymentCkwUpdateComponent } from './payment-ckw-update.component';
import { PaymentCkwDeletePopupComponent } from './payment-ckw-delete-dialog.component';
import { IPaymentCkw } from 'app/shared/model/payment-ckw.model';

@Injectable({ providedIn: 'root' })
export class PaymentCkwResolve implements Resolve<IPaymentCkw> {
    constructor(private service: PaymentCkwService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((payment: HttpResponse<PaymentCkw>) => payment.body));
        }
        return of(new PaymentCkw());
    }
}

export const paymentRoute: Routes = [
    {
        path: 'payment-ckw',
        component: PaymentCkwComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'clikawayApp.payment.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'payment-ckw/:id/view',
        component: PaymentCkwDetailComponent,
        resolve: {
            payment: PaymentCkwResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clikawayApp.payment.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'payment-ckw/new',
        component: PaymentCkwUpdateComponent,
        resolve: {
            payment: PaymentCkwResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clikawayApp.payment.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'payment-ckw/:id/edit',
        component: PaymentCkwUpdateComponent,
        resolve: {
            payment: PaymentCkwResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clikawayApp.payment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const paymentPopupRoute: Routes = [
    {
        path: 'payment-ckw/:id/delete',
        component: PaymentCkwDeletePopupComponent,
        resolve: {
            payment: PaymentCkwResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clikawayApp.payment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
