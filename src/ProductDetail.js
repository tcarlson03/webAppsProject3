import React, { useState, useEffect } from 'react';

function ProductDetail({ product, onClose }) {

    useEffect(() => {
        const productContainer = document.querySelectorAll('span');
        productContainer.forEach((productContainer) => {
        productContainer.style.fontWeight = 'bold';
        });
    }, []);

    useEffect(() => {
        const productContainer = document.querySelectorAll('.center');
        productContainer.forEach((productContainer) => {
        productContainer.style.marginLeft = 'auto';
        productContainer.style.marginRight = 'auto';
        productContainer.style.display = 'block';
        });
    }, []);

    useEffect(() => {
        const productContainer = document.querySelectorAll('h3');
        productContainer.forEach((productContainer) => {
        productContainer.style.fontSize = '1.7vw';
        productContainer.style.margin = '0px';
        });
    }, []);

    useEffect(() => {
            const productContainer = document.querySelectorAll('p');
            productContainer.forEach((productContainer) => {
            productContainer.style.margin = '0px';
            });
        }, []);

    return (
        <div className="product-detail-container">
            <div className="product-detail">
                <button className="close-button" onClick={onClose}>x</button> {/* Close button */}
                <img src={product.image} alt={product.title} class="center" />
                <p>{product.title}</p>
                <h3>${product.price.toFixed(2)}</h3>
                <p><span>Category: </span>{product.category}</p>
                <p><span>Rating: </span>{product.rating.rate.toLocaleString()}</p>
                <p><span>In Stock: </span>{product.inventory.toLocaleString()}</p>
            </div>
        </div>
    );
}

export default ProductDetail;