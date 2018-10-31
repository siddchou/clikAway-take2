import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IContractorServiceCkw } from 'app/shared/model/contractor-service-ckw.model';
import { ContractorServiceCkwService } from './contractor-service-ckw.service';
import { IContractorCkw } from 'app/shared/model/contractor-ckw.model';
import { ContractorCkwService } from 'app/entities/contractor-ckw';
import { IServicesCkw } from 'app/shared/model/services-ckw.model';
import { ServicesCkwService } from 'app/entities/services-ckw';

@Component({
    selector: 'jhi-contractor-service-ckw-update',
    templateUrl: './contractor-service-ckw-update.component.html'
})
export class ContractorServiceCkwUpdateComponent implements OnInit {
    contractorService: IContractorServiceCkw;
    isSaving: boolean;

    contractors: IContractorCkw[];

    services: IServicesCkw[];
    startDate: string;
    endDate: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private contractorServiceService: ContractorServiceCkwService,
        private contractorService: ContractorCkwService,
        private servicesService: ServicesCkwService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ contractorService }) => {
            this.contractorService = contractorService;
            this.startDate = this.contractorService.startDate != null ? this.contractorService.startDate.format(DATE_TIME_FORMAT) : null;
            this.endDate = this.contractorService.endDate != null ? this.contractorService.endDate.format(DATE_TIME_FORMAT) : null;
        });
        this.contractorService.query({ filter: 'contractorservice-is-null' }).subscribe(
            (res: HttpResponse<IContractorCkw[]>) => {
                if (!this.contractorService.contractorId) {
                    this.contractors = res.body;
                } else {
                    this.contractorService.find(this.contractorService.contractorId).subscribe(
                        (subRes: HttpResponse<IContractorCkw>) => {
                            this.contractors = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.servicesService.query({ filter: 'contractorservice-is-null' }).subscribe(
            (res: HttpResponse<IServicesCkw[]>) => {
                if (!this.contractorService.servicesId) {
                    this.services = res.body;
                } else {
                    this.servicesService.find(this.contractorService.servicesId).subscribe(
                        (subRes: HttpResponse<IServicesCkw>) => {
                            this.services = [subRes.body].concat(res.body);
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
        this.contractorService.startDate = this.startDate != null ? moment(this.startDate, DATE_TIME_FORMAT) : null;
        this.contractorService.endDate = this.endDate != null ? moment(this.endDate, DATE_TIME_FORMAT) : null;
        if (this.contractorService.id !== undefined) {
            this.subscribeToSaveResponse(this.contractorServiceService.update(this.contractorService));
        } else {
            this.subscribeToSaveResponse(this.contractorServiceService.create(this.contractorService));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IContractorServiceCkw>>) {
        result.subscribe(
            (res: HttpResponse<IContractorServiceCkw>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
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

    trackContractorById(index: number, item: IContractorCkw) {
        return item.id;
    }

    trackServicesById(index: number, item: IServicesCkw) {
        return item.id;
    }
}
