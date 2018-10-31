import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClikawaySharedModule } from 'app/shared';
import {
    JobHistoryCkwComponent,
    JobHistoryCkwDetailComponent,
    JobHistoryCkwUpdateComponent,
    JobHistoryCkwDeletePopupComponent,
    JobHistoryCkwDeleteDialogComponent,
    jobHistoryRoute,
    jobHistoryPopupRoute
} from './';

const ENTITY_STATES = [...jobHistoryRoute, ...jobHistoryPopupRoute];

@NgModule({
    imports: [ClikawaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        JobHistoryCkwComponent,
        JobHistoryCkwDetailComponent,
        JobHistoryCkwUpdateComponent,
        JobHistoryCkwDeleteDialogComponent,
        JobHistoryCkwDeletePopupComponent
    ],
    entryComponents: [
        JobHistoryCkwComponent,
        JobHistoryCkwUpdateComponent,
        JobHistoryCkwDeleteDialogComponent,
        JobHistoryCkwDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClikawayJobHistoryCkwModule {}
