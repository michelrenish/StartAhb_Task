import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    readonly products = signal<Product[]>([]);

    constructor() {
        // Add dummy data for testing
        this.products.set([
            { id: '1', productName: 'Test Product', productPrice: 99.99, productDescription: 'This is a test product' }
        ]);
    }

    getProducts() {
        return this.products;
    }

    addProduct(product: Omit<Product, 'id'>) {
        const newProduct = { ...product, id: crypto.randomUUID() };
        this.products.update(current => [...current, newProduct]);
    }

    updateProduct(updatedProduct: Product) {
        this.products.update(current =>
            current.map(p => p.id === updatedProduct.id ? updatedProduct : p)
        );
    }

    deleteProduct(id: string) {
        this.products.update(current => current.filter(p => p.id !== id));
    }
}
