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
    productId: string | null = null;

    ngOnInit() {
        this.productId = this.route.snapshot.paramMap.get('id');
        if (this.productId) {
            this.isEditMode = true;
            const product = this.productService.getProducts()().find(p => p.id === this.productId);
            if (product) {
                this.productForm.patchValue(product);
            } else {
                // Product not found, redirect to list
                this.router.navigate(['/products']);
            }
        }
    }

    onSubmit() {
        if (this.productForm.valid) {
            const formValue = this.productForm.value;
            if (this.isEditMode && this.productId) {
                this.productService.updateProduct({ ...formValue, id: this.productId });
            } else {
                this.productService.addProduct(formValue);
            }
            this.router.navigate(['/products']);
        }
    }
}
