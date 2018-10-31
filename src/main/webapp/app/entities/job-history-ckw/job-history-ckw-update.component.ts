import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IJobHistoryCkw } from 'app/shared/model/job-history-ckw.model';
import { JobHistoryCkwService } from './job-history-ckw.service';
import { IPaymentCkw } from 'app/shared/model/payment-ckw.model';
import { PaymentCkwService } from 'app/entities/payment-ckw';
import { IContractorServiceCkw } from 'app/shared/model/contractor-service-ckw.model';
import { ContractorServiceCkwService } from 'app/entities/contractor-service-ckw';
import { IUserAddressMapCkw } from 'app/shared/model/user-address-map-ckw.model';
import { UserAddressMapCkwService } from 'app/entities/user-address-map-ckw';

@Component({
    selector: 'jhi-job-history-ckw-update',
    templateUrl: './job-history-ckw-update.component.html'
})
export class JobHistoryCkwUpdateComponent implements OnInit {
    jobHistory: IJobHistoryCkw;
    isSaving: boolean;

    payments: IPaymentCkw[];

    contractorservices: IContractorServiceCkw[];

    useraddressmaps: IUserAddressMapCkw[];
    startDate: string;
    endDate: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private jobHistoryService: JobHistoryCkwService,
        private paymentService: PaymentCkwService,
        private contractorServiceService: ContractorServiceCkwService,
        private userAddressMapService: UserAddressMapCkwService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ jobHistory }) => {
            this.jobHistory = jobHistory;
            this.startDate = this.jobHistory.startDate != null ? this.jobHistory.startDate.format(DATE_TIME_FORMAT) : null;
            this.endDate = this.jobHistory.endDate != null ? this.jobHistory.endDate.format(DATE_TIME_FORMAT) : null;
        });
        this.paymentService.query({ filter: 'jobhistory-is-null' }).subscribe(
            (res: HttpResponse<IPaymentCkw[]>) => {
                if (!this.jobHistory.paymentId) {
                    this.payments = res.body;
                } else {
                    this.paymentService.find(this.jobHistory.paymentId).subscribe(
                        (subRes: HttpResponse<IPaymentCkw>) => {
                            this.payments = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.contractorServiceService.query({ filter: 'jobhistory-is-null' }).subscribe(
            (res: HttpResponse<IContractorServiceCkw[]>) => {
                if (!this.jobHistory.contractorServiceId) {
                    this.contractorservices = res.body;
                } else {
                    this.contractorServiceService.find(this.jobHistory.contractorServiceId).subscribe(
                        (subRes: HttpResponse<IContractorServiceCkw>) => {
                            this.contractorservices = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.userAddressMapService.query({ filter: 'jobhistory-is-null' }).subscribe(
            (res: HttpResponse<IUserAddressMapCkw[]>) => {
                if (!this.jobHistory.userAddressMapId) {
                    this.useraddressmaps = res.body;
                } else {
                    this.userAddressMapService.find(this.jobHistory.userAddressMapId).subscribe(
                        (subRes: HttpResponse<IUserAddressMapCkw>) => {
                            this.useraddressmaps = [subRes.body].concat(res.body);
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
        this.jobHistory.startDate = this.startDate != null ? moment(this.startDate, DATE_TIME_FORMAT) : null;
        this.jobHistory.endDate = this.endDate != null ? moment(this.endDate, DATE_TIME_FORMAT) : null;
        if (this.jobHistory.id !== undefined) {
            this.subscribeToSaveResponse(this.jobHistoryService.update(this.jobHistory));
        } else {
            this.subscribeToSaveResponse(this.jobHistoryService.create(this.jobHistory));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IJobHistoryCkw>>) {
        result.subscribe((res: HttpResponse<IJobHistoryCkw>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPaymentById(index: number, item: IPaymentCkw) {
        return item.id;
    }

    trackContractorServiceById(index: number, item: IContractorServiceCkw) {
        return item.id;
    }

    trackUserAddressMapById(index: number, item: IUserAddressMapCkw) {
        return item.id;
    }
}
