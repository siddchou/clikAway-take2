import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ClikawayCategoryCkwModule } from './category-ckw/category-ckw.module';
import { ClikawayServicesCkwModule } from './services-ckw/services-ckw.module';
import { ClikawayContractorServiceCkwModule } from './contractor-service-ckw/contractor-service-ckw.module';
import { ClikawayUserAddressMapCkwModule } from './user-address-map-ckw/user-address-map-ckw.module';
import { ClikawayContractorCkwModule } from './contractor-ckw/contractor-ckw.module';
import { ClikawayLocationCkwModule } from './location-ckw/location-ckw.module';
import { ClikawayRateCkwModule } from './rate-ckw/rate-ckw.module';
import { ClikawayAppUserCkwModule } from './app-user-ckw/app-user-ckw.module';
import { ClikawayAddressCkwModule } from './address-ckw/address-ckw.module';
import { ClikawayJobHistoryCkwModule } from './job-history-ckw/job-history-ckw.module';
import { ClikawayJobTimeLogCkwModule } from './job-time-log-ckw/job-time-log-ckw.module';
import { ClikawayPaymentCkwModule } from './payment-ckw/payment-ckw.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        ClikawayCategoryCkwModule,
        ClikawayServicesCkwModule,
        ClikawayContractorServiceCkwModule,
        ClikawayUserAddressMapCkwModule,
        ClikawayContractorCkwModule,
        ClikawayLocationCkwModule,
        ClikawayRateCkwModule,
        ClikawayAppUserCkwModule,
        ClikawayAddressCkwModule,
        ClikawayJobHistoryCkwModule,
        ClikawayJobTimeLogCkwModule,
        ClikawayPaymentCkwModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClikawayEntityModule {}
