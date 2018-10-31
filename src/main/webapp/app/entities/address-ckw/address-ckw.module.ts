import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClikawaySharedModule } from 'app/shared';
import {
    AddressCkwComponent,
    AddressCkwDetailComponent,
    AddressCkwUpdateComponent,
    AddressCkwDeletePopupComponent,
    AddressCkwDeleteDialogComponent,
    addressRoute,
    addressPopupRoute
} from './';

const ENTITY_STATES = [...addressRoute, ...addressPopupRoute];

@NgModule({
    imports: [ClikawaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AddressCkwComponent,
        AddressCkwDetailComponent,
        AddressCkwUpdateComponent,
        AddressCkwDeleteDialogComponent,
        AddressCkwDeletePopupComponent
    ],
    entryComponents: [AddressCkwComponent, AddressCkwUpdateComponent, AddressCkwDeleteDialogComponent, AddressCkwDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClikawayAddressCkwModule {}
