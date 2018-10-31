import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IRateCkw } from 'app/shared/model/rate-ckw.model';
import { RateCkwService } from './rate-ckw.service';

@Component({
    selector: 'jhi-rate-ckw-update',
    templateUrl: './rate-ckw-update.component.html'
})
export class RateCkwUpdateComponent implements OnInit {
    rate: IRateCkw;
    isSaving: boolean;

    constructor(private rateService: RateCkwService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ rate }) => {
            this.rate = rate;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.rate.id !== undefined) {
            this.subscribeToSaveResponse(this.rateService.update(this.rate));
        } else {
            this.subscribeToSaveResponse(this.rateService.create(this.rate));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IRateCkw>>) {
        result.subscribe((res: HttpResponse<IRateCkw>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
