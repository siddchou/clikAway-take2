import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClikawaySharedModule } from 'app/shared';
import {
    PaymentCkwComponent,
    PaymentCkwDetailComponent,
    PaymentCkwUpdateComponent,
    PaymentCkwDeletePopupComponent,
    PaymentCkwDeleteDialogComponent,
    paymentRoute,
    paymentPopupRoute
} from './';

const ENTITY_STATES = [...paymentRoute, ...paymentPopupRoute];

@NgModule({
    imports: [ClikawaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PaymentCkwComponent,
        PaymentCkwDetailComponent,
        PaymentCkwUpdateComponent,
        PaymentCkwDeleteDialogComponent,
        PaymentCkwDeletePopupComponent
    ],
    entryComponents: [PaymentCkwComponent, PaymentCkwUpdateComponent, PaymentCkwDeleteDialogComponent, PaymentCkwDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClikawayPaymentCkwModule {}
