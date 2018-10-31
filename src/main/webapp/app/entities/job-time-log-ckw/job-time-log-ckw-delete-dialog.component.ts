import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IJobTimeLogCkw } from 'app/shared/model/job-time-log-ckw.model';
import { JobTimeLogCkwService } from './job-time-log-ckw.service';

@Component({
    selector: 'jhi-job-time-log-ckw-delete-dialog',
    templateUrl: './job-time-log-ckw-delete-dialog.component.html'
})
export class JobTimeLogCkwDeleteDialogComponent {
    jobTimeLog: IJobTimeLogCkw;

    constructor(
        private jobTimeLogService: JobTimeLogCkwService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.jobTimeLogService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'jobTimeLogListModification',
                content: 'Deleted an jobTimeLog'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-job-time-log-ckw-delete-popup',
    template: ''
})
export class JobTimeLogCkwDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ jobTimeLog }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(JobTimeLogCkwDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.jobTimeLog = jobTimeLog;
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
