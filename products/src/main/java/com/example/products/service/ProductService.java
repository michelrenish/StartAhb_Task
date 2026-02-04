package com.example.products.service;

import com.example.products.dto.CreateProduct;
import com.example.products.dto.UpdateProduct;
import com.example.products.entity.Products;
import com.example.products.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;


    public Products addProduct(CreateProduct dto) {

        Products product = new Products();
        product.setProductName(dto.getProductName());
        product.setProductDescription(dto.getProductDescription());
        product.setProductPrice(dto.getProductPrice());

        return productRepository.save(product);
    }

    public List<Products> getAllProducts() {
        return productRepository.findAll();
    }

    public Products getProductById(Integer id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    public Products updateProduct(Integer id, UpdateProduct products) {

        Products product = getProductById(id);

        if (products.getProductName() != null) {
            product.setProductName(products.getProductName());
        }

        if (products.getProductDescription() != null) {
            product.setProductDescription(products.getProductDescription());
        }

        if (products.getProductPrice() != null) {
            product.setProductPrice(products.getProductPrice());
        }

        return productRepository.save(product);
    }

    public void deleteProduct(Integer id) {
        Products product = getProductById(id);
        productRepository.delete(product);
    }
}
