import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICategoryCkw } from 'app/shared/model/category-ckw.model';
import { CategoryCkwService } from './category-ckw.service';

@Component({
    selector: 'jhi-category-ckw-update',
    templateUrl: './category-ckw-update.component.html'
})
export class CategoryCkwUpdateComponent implements OnInit {
    category: ICategoryCkw;
    isSaving: boolean;

    constructor(private categoryService: CategoryCkwService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ category }) => {
            this.category = category;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.category.id !== undefined) {
            this.subscribeToSaveResponse(this.categoryService.update(this.category));
        } else {
            this.subscribeToSaveResponse(this.categoryService.create(this.category));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICategoryCkw>>) {
        result.subscribe((res: HttpResponse<ICategoryCkw>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
