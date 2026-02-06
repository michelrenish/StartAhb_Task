import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule],
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.css'
})
export class ProductListComponent {
    private productService = inject(ProductService);

    searchQuery = signal('');

    // Base products signal from service
    private products = this.productService.getProducts();

    // Computed signal for filtered products
    filteredProducts = computed(() => {
        const query = this.searchQuery().toLowerCase();
        const allProducts = this.products();

        if (!query) return allProducts;

        return allProducts.filter(p =>
            p.productName.toLowerCase().includes(query) ||
            p.productDescription.toLowerCase().includes(query)
        );
    });

    deleteProduct(id: number) {
        if (confirm('Are you sure you want to delete this product?')) {
            this.productService.deleteProduct(id).subscribe({
                next: () => console.log('Product deleted'),
                error: (err) => console.error('Error deleting product', err)
            });
        }
    }

    updateSearch(event: Event) {
        const target = event.target as HTMLInputElement;
        this.searchQuery.set(target.value);
    }
}
