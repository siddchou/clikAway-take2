import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClikawaySharedModule } from 'app/shared';
import {
    ContractorCkwComponent,
    ContractorCkwDetailComponent,
    ContractorCkwUpdateComponent,
    ContractorCkwDeletePopupComponent,
    ContractorCkwDeleteDialogComponent,
    contractorRoute,
    contractorPopupRoute
} from './';

const ENTITY_STATES = [...contractorRoute, ...contractorPopupRoute];

@NgModule({
    imports: [ClikawaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ContractorCkwComponent,
        ContractorCkwDetailComponent,
        ContractorCkwUpdateComponent,
        ContractorCkwDeleteDialogComponent,
        ContractorCkwDeletePopupComponent
    ],
    entryComponents: [
        ContractorCkwComponent,
        ContractorCkwUpdateComponent,
        ContractorCkwDeleteDialogComponent,
        ContractorCkwDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClikawayContractorCkwModule {}
