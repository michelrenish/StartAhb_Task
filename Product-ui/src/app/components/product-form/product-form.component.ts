import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
    selector: 'app-product-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './product-form.component.html',
    styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {
    private fb = inject(FormBuilder);
    private productService = inject(ProductService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    productForm: FormGroup = this.fb.group({
        productName: ['', Validators.required],
        productPrice: [0, [Validators.required, Validators.min(0)]],
        productDescription: ['', Validators.required]
    });

    isEditMode = false;
    productId: number | null = null;

    ngOnInit() {
        const idParam = this.route.snapshot.paramMap.get('id');
        if (idParam) {
            this.productId = +idParam;
            this.isEditMode = true;
            this.productService.getProductById(this.productId).subscribe({
                next: (product) => this.productForm.patchValue(product),
                error: () => this.router.navigate(['/products'])
            });
        }
    }

    onSubmit() {
        if (this.productForm.valid) {
            const formValue = this.productForm.value;
            if (this.isEditMode && this.productId) {
                this.productService.updateProduct(this.productId, formValue).subscribe({
                    next: () => this.router.navigate(['/products']),
                    error: (err) => console.error('Error updating product', err)
                });
            } else {
                this.productService.addProduct(formValue).subscribe({
                    next: () => this.router.navigate(['/products']),
                    error: (err) => console.error('Error adding product', err)
                });
            }
        }
    }
}
