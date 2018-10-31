import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClikawaySharedModule } from 'app/shared';
import {
    ServicesCkwComponent,
    ServicesCkwDetailComponent,
    ServicesCkwUpdateComponent,
    ServicesCkwDeletePopupComponent,
    ServicesCkwDeleteDialogComponent,
    servicesRoute,
    servicesPopupRoute
} from './';

const ENTITY_STATES = [...servicesRoute, ...servicesPopupRoute];

@NgModule({
    imports: [ClikawaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ServicesCkwComponent,
        ServicesCkwDetailComponent,
        ServicesCkwUpdateComponent,
        ServicesCkwDeleteDialogComponent,
        ServicesCkwDeletePopupComponent
    ],
    entryComponents: [ServicesCkwComponent, ServicesCkwUpdateComponent, ServicesCkwDeleteDialogComponent, ServicesCkwDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClikawayServicesCkwModule {}
