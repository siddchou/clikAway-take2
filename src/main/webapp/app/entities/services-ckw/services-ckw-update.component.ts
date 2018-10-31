import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IServicesCkw } from 'app/shared/model/services-ckw.model';
import { ServicesCkwService } from './services-ckw.service';
import { IRateCkw } from 'app/shared/model/rate-ckw.model';
import { RateCkwService } from 'app/entities/rate-ckw';
import { ICategoryCkw } from 'app/shared/model/category-ckw.model';
import { CategoryCkwService } from 'app/entities/category-ckw';
import { ILocationCkw } from 'app/shared/model/location-ckw.model';
import { LocationCkwService } from 'app/entities/location-ckw';

@Component({
    selector: 'jhi-services-ckw-update',
    templateUrl: './services-ckw-update.component.html'
})
export class ServicesCkwUpdateComponent implements OnInit {
    services: IServicesCkw;
    isSaving: boolean;

    rates: IRateCkw[];

    categories: ICategoryCkw[];

    locations: ILocationCkw[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private servicesService: ServicesCkwService,
        private rateService: RateCkwService,
        private categoryService: CategoryCkwService,
        private locationService: LocationCkwService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ services }) => {
            this.services = services;
        });
        this.rateService.query({ filter: 'services-is-null' }).subscribe(
            (res: HttpResponse<IRateCkw[]>) => {
                if (!this.services.rateId) {
                    this.rates = res.body;
                } else {
                    this.rateService.find(this.services.rateId).subscribe(
                        (subRes: HttpResponse<IRateCkw>) => {
                            this.rates = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.categoryService.query({ filter: 'services-is-null' }).subscribe(
            (res: HttpResponse<ICategoryCkw[]>) => {
                if (!this.services.categoryId) {
                    this.categories = res.body;
                } else {
                    this.categoryService.find(this.services.categoryId).subscribe(
                        (subRes: HttpResponse<ICategoryCkw>) => {
                            this.categories = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.locationService.query({ filter: 'services-is-null' }).subscribe(
            (res: HttpResponse<ILocationCkw[]>) => {
                if (!this.services.locationId) {
                    this.locations = res.body;
                } else {
                    this.locationService.find(this.services.locationId).subscribe(
                        (subRes: HttpResponse<ILocationCkw>) => {
                            this.locations = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.services.id !== undefined) {
            this.subscribeToSaveResponse(this.servicesService.update(this.services));
        } else {
            this.subscribeToSaveResponse(this.servicesService.create(this.services));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IServicesCkw>>) {
        result.subscribe((res: HttpResponse<IServicesCkw>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackRateById(index: number, item: IRateCkw) {
        return item.id;
    }

    trackCategoryById(index: number, item: ICategoryCkw) {
        return item.id;
    }

    trackLocationById(index: number, item: ILocationCkw) {
        return item.id;
    }
}
