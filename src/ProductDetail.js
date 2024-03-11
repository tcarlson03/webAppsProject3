import React from 'react';

function ProductDetail({ product, onClose }) {
    return (
        <div className="product-detail-container">
            <div className="product-detail">
                <button className="close-button" onClick={onClose}>x</button> {/* Close button */}
                <img src={product.image} alt={product.title} />
                <h3>{product.title}</h3>
                <p>Price: {product.price.toFixed(2)}</p>
                <p>Category: {product.category}</p>
                <p>Rating: {product.rating.rate}</p>
                <p>In Stock: {product.inventory}</p>
            </div>
        </div>
    );
}

export default ProductDetail;