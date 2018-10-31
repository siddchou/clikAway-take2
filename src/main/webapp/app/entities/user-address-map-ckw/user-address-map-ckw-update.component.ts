import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IUserAddressMapCkw } from 'app/shared/model/user-address-map-ckw.model';
import { UserAddressMapCkwService } from './user-address-map-ckw.service';
import { IAppUserCkw } from 'app/shared/model/app-user-ckw.model';
import { AppUserCkwService } from 'app/entities/app-user-ckw';
import { IAddressCkw } from 'app/shared/model/address-ckw.model';
import { AddressCkwService } from 'app/entities/address-ckw';

@Component({
    selector: 'jhi-user-address-map-ckw-update',
    templateUrl: './user-address-map-ckw-update.component.html'
})
export class UserAddressMapCkwUpdateComponent implements OnInit {
    userAddressMap: IUserAddressMapCkw;
    isSaving: boolean;

    appusers: IAppUserCkw[];

    addresses: IAddressCkw[];
    startDate: string;
    endDate: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private userAddressMapService: UserAddressMapCkwService,
        private appUserService: AppUserCkwService,
        private addressService: AddressCkwService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ userAddressMap }) => {
            this.userAddressMap = userAddressMap;
            this.startDate = this.userAddressMap.startDate != null ? this.userAddressMap.startDate.format(DATE_TIME_FORMAT) : null;
            this.endDate = this.userAddressMap.endDate != null ? this.userAddressMap.endDate.format(DATE_TIME_FORMAT) : null;
        });
        this.appUserService.query({ filter: 'useraddressmap-is-null' }).subscribe(
            (res: HttpResponse<IAppUserCkw[]>) => {
                if (!this.userAddressMap.appUserId) {
                    this.appusers = res.body;
                } else {
                    this.appUserService.find(this.userAddressMap.appUserId).subscribe(
                        (subRes: HttpResponse<IAppUserCkw>) => {
                            this.appusers = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.addressService.query({ filter: 'useraddressmap-is-null' }).subscribe(
            (res: HttpResponse<IAddressCkw[]>) => {
                if (!this.userAddressMap.addressId) {
                    this.addresses = res.body;
                } else {
                    this.addressService.find(this.userAddressMap.addressId).subscribe(
                        (subRes: HttpResponse<IAddressCkw>) => {
                            this.addresses = [subRes.body].concat(res.body);
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
        this.userAddressMap.startDate = this.startDate != null ? moment(this.startDate, DATE_TIME_FORMAT) : null;
        this.userAddressMap.endDate = this.endDate != null ? moment(this.endDate, DATE_TIME_FORMAT) : null;
        if (this.userAddressMap.id !== undefined) {
            this.subscribeToSaveResponse(this.userAddressMapService.update(this.userAddressMap));
        } else {
            this.subscribeToSaveResponse(this.userAddressMapService.create(this.userAddressMap));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IUserAddressMapCkw>>) {
        result.subscribe((res: HttpResponse<IUserAddressMapCkw>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackAppUserById(index: number, item: IAppUserCkw) {
        return item.id;
    }

    trackAddressById(index: number, item: IAddressCkw) {
        return item.id;
    }
}
