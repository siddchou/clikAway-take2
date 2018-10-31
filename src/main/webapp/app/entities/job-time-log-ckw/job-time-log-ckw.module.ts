import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClikawaySharedModule } from 'app/shared';
import {
    JobTimeLogCkwComponent,
    JobTimeLogCkwDetailComponent,
    JobTimeLogCkwUpdateComponent,
    JobTimeLogCkwDeletePopupComponent,
    JobTimeLogCkwDeleteDialogComponent,
    jobTimeLogRoute,
    jobTimeLogPopupRoute
} from './';

const ENTITY_STATES = [...jobTimeLogRoute, ...jobTimeLogPopupRoute];

@NgModule({
    imports: [ClikawaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        JobTimeLogCkwComponent,
        JobTimeLogCkwDetailComponent,
        JobTimeLogCkwUpdateComponent,
        JobTimeLogCkwDeleteDialogComponent,
        JobTimeLogCkwDeletePopupComponent
    ],
    entryComponents: [
        JobTimeLogCkwComponent,
        JobTimeLogCkwUpdateComponent,
        JobTimeLogCkwDeleteDialogComponent,
        JobTimeLogCkwDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClikawayJobTimeLogCkwModule {}
