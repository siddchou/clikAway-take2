import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPaymentCkw } from 'app/shared/model/payment-ckw.model';
import { PaymentCkwService } from './payment-ckw.service';

@Component({
    selector: 'jhi-payment-ckw-delete-dialog',
    templateUrl: './payment-ckw-delete-dialog.component.html'
})
export class PaymentCkwDeleteDialogComponent {
    payment: IPaymentCkw;

    constructor(private paymentService: PaymentCkwService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.paymentService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'paymentListModification',
                content: 'Deleted an payment'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-payment-ckw-delete-popup',
    template: ''
})
export class PaymentCkwDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ payment }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PaymentCkwDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.payment = payment;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
