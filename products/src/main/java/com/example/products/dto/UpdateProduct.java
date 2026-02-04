package com.example.products.dto;

import lombok.Data;

@Data
public class UpdateProduct {

    private String productName;
    private String productDescription;
    private Double productPrice;

}