import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocationCkw } from 'app/shared/model/location-ckw.model';
import { LocationCkwService } from './location-ckw.service';
import { LocationCkwComponent } from './location-ckw.component';
import { LocationCkwDetailComponent } from './location-ckw-detail.component';
import { LocationCkwUpdateComponent } from './location-ckw-update.component';
import { LocationCkwDeletePopupComponent } from './location-ckw-delete-dialog.component';
import { ILocationCkw } from 'app/shared/model/location-ckw.model';

@Injectable({ providedIn: 'root' })
export class LocationCkwResolve implements Resolve<ILocationCkw> {
    constructor(private service: LocationCkwService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((location: HttpResponse<LocationCkw>) => location.body));
        }
        return of(new LocationCkw());
    }
}

export const locationRoute: Routes = [
    {
        path: 'location-ckw',
        component: LocationCkwComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'clikawayApp.location.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'location-ckw/:id/view',
        component: LocationCkwDetailComponent,
        resolve: {
            location: LocationCkwResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clikawayApp.location.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'location-ckw/new',
        component: LocationCkwUpdateComponent,
        resolve: {
            location: LocationCkwResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clikawayApp.location.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'location-ckw/:id/edit',
        component: LocationCkwUpdateComponent,
        resolve: {
            location: LocationCkwResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clikawayApp.location.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const locationPopupRoute: Routes = [
    {
        path: 'location-ckw/:id/delete',
        component: LocationCkwDeletePopupComponent,
        resolve: {
            location: LocationCkwResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clikawayApp.location.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
