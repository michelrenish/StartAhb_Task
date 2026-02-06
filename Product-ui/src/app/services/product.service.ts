import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8082/product';

    readonly products = signal<Product[]>([]);

    constructor() {
        this.loadProducts();
    }

    loadProducts() {
        this.http.get<Product[]>(this.apiUrl).subscribe(data => {
            this.products.set(data);
        });
    }

    getProducts() {
        return this.products;
    }

    getProductById(id: number): Observable<Product> {
        return this.http.get<Product>(`${this.apiUrl}/${id}`);
    }

    addProduct(product: Product): Observable<Product> {
        return this.http.post<Product>(this.apiUrl, product).pipe(
            tap(newProduct => {
                this.products.update(current => [...current, newProduct]);
            })
        );
    }

    updateProduct(id: number, product: Product): Observable<Product> {
        return this.http.put<Product>(`${this.apiUrl}/${id}`, product).pipe(
            tap(updatedProduct => {
                this.products.update(current =>
                    current.map(p => p.productId === id ? updatedProduct : p)
                );
            })
        );
    }

    deleteProduct(id: number): Observable<string> {
        return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' }).pipe(
            tap(() => {
                this.products.update(current => current.filter(p => p.productId !== id));
            })
        );
    }
}
