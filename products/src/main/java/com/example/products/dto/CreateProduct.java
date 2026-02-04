package com.example.products.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class CreateProduct {

    private String productName;
    private String productDescription;
    private double productPrice;
}
