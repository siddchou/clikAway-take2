import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { JobHistoryCkw } from 'app/shared/model/job-history-ckw.model';
import { JobHistoryCkwService } from './job-history-ckw.service';
import { JobHistoryCkwComponent } from './job-history-ckw.component';
import { JobHistoryCkwDetailComponent } from './job-history-ckw-detail.component';
import { JobHistoryCkwUpdateComponent } from './job-history-ckw-update.component';
import { JobHistoryCkwDeletePopupComponent } from './job-history-ckw-delete-dialog.component';
import { IJobHistoryCkw } from 'app/shared/model/job-history-ckw.model';

@Injectable({ providedIn: 'root' })
export class JobHistoryCkwResolve implements Resolve<IJobHistoryCkw> {
    constructor(private service: JobHistoryCkwService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((jobHistory: HttpResponse<JobHistoryCkw>) => jobHistory.body));
        }
        return of(new JobHistoryCkw());
    }
}

export const jobHistoryRoute: Routes = [
    {
        path: 'job-history-ckw',
        component: JobHistoryCkwComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'clikawayApp.jobHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'job-history-ckw/:id/view',
        component: JobHistoryCkwDetailComponent,
        resolve: {
            jobHistory: JobHistoryCkwResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clikawayApp.jobHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'job-history-ckw/new',
        component: JobHistoryCkwUpdateComponent,
        resolve: {
            jobHistory: JobHistoryCkwResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clikawayApp.jobHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'job-history-ckw/:id/edit',
        component: JobHistoryCkwUpdateComponent,
        resolve: {
            jobHistory: JobHistoryCkwResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clikawayApp.jobHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const jobHistoryPopupRoute: Routes = [
    {
        path: 'job-history-ckw/:id/delete',
        component: JobHistoryCkwDeletePopupComponent,
        resolve: {
            jobHistory: JobHistoryCkwResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clikawayApp.jobHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
