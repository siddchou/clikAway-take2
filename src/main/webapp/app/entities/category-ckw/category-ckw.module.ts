import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClikawaySharedModule } from 'app/shared';
import {
    CategoryCkwComponent,
    CategoryCkwDetailComponent,
    CategoryCkwUpdateComponent,
    CategoryCkwDeletePopupComponent,
    CategoryCkwDeleteDialogComponent,
    categoryRoute,
    categoryPopupRoute
} from './';

const ENTITY_STATES = [...categoryRoute, ...categoryPopupRoute];

@NgModule({
    imports: [ClikawaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CategoryCkwComponent,
        CategoryCkwDetailComponent,
        CategoryCkwUpdateComponent,
        CategoryCkwDeleteDialogComponent,
        CategoryCkwDeletePopupComponent
    ],
    entryComponents: [CategoryCkwComponent, CategoryCkwUpdateComponent, CategoryCkwDeleteDialogComponent, CategoryCkwDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClikawayCategoryCkwModule {}
