import React, { useState, useEffect } from 'react';
import './App.css';
import ProductDetail from './ProductDetail';
import App from "./App"; // Import the ProductDetail component

function Products() {
    const [data, setData] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null); // State to track the selected product
    const [showProductDetail, setShowProductDetail] = useState(false);

    useEffect(() => {
        // Fetch the JSON file
        fetch('products.json')
            .then(response => response.json())
            .then(jsonData => {
                // Once the JSON data is fetched, set it to the state
                setData(jsonData);
            })
            .catch(error => {
                // Log any errors for debugging
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
        const productContainer = document.querySelectorAll('.product');
        productContainer.forEach((productContainer, index) => {
            productContainer.style.display = 'flex';
            productContainer.style.margin = '0px';
        });
    }, [data]);

    useEffect(() => {
        const productContainers = document.querySelectorAll('p');
        productContainers.forEach((productContainers, index) => {
            productContainers.style.border = '1px solid #FFFFFF';
            productContainers.style.paddingLeft = '10px';
            productContainers.style.paddingTop = '10px';
            productContainers.style.fontSize = '1vw';
            if (index % 7 === 1 || index % 7 === 4 || index % 7 === 5) {
                productContainers.style.textAlign = 'right';
            } else {
                productContainers.style.textAlign = 'left';
            }
            productContainers.style.paddingBottom = '10px';
            productContainers.style.paddingRight = '10px';
            if (Math.floor(index / 7) % 2 === 0) {
                productContainers.style.backgroundColor = '#e0e0e0'; //'#ffffff'
            } else {
                productContainers.style.backgroundColor = '#e0e0e0';
            }
        });
    }, [data]);

    useEffect(() => {
        const h3Element = document.querySelectorAll('h3');
        h3Element.forEach((h3Element, index) => {
            h3Element.style.backgroundColor = '#999999';
            h3Element.style.padding = '10px';
            h3Element.style.border = '1px solid #FFFFFF';
            h3Element.style.fontSize = '1.7vw';
            if (index === 1 || index === 4 || index === 5) {
                h3Element.style.textAlign = 'right';
            } else {
                h3Element.style.textAlign = 'left';
            }
        });
    }, [data]);

    useEffect(() => {
        const productTotal = document.querySelector('.product-list');
        if (productTotal) {
            productTotal.style.display = 'flex';
            productTotal.style.flexDirection = 'column';
        }
    }, [data]);

    useEffect(() => {
        const columnTitlesContainer = document.querySelector('.column-titles');
        if (columnTitlesContainer) {
            columnTitlesContainer.style.display = 'flex';
            columnTitlesContainer.style.flexDirection = 'row';
            columnTitlesContainer.style.padding = '10px';
        }
    }, [data]);

    const handleLearnMoreClick = (product) => {
        // Update selectedProduct state with the clicked product
        setSelectedProduct(product);
        setShowProductDetail(true);

    };

    const handleCloseProductDetail = () => {
        // Clear the selected product and hide the ProductDetail component
        setSelectedProduct(null);
        setShowProductDetail(false);
    };


    return (

        <div className="App">
            <App />
            <h2>Products</h2>
            <div className="column-titles">
                <h3 style={{ width: `${100 / 3}%` }}>Title</h3>
                <h3 style={{ width: `${100 / 7}%` }}>Price</h3>
                <h3 style={{ width: `${100 / 7}%` }}>Category</h3>
                <h3 style={{ width: `${100 / 7}%` }}>Rating</h3>
                <h3 style={{ width: `${100 / 7}%` }}>Inventory</h3>
                <h3 style={{ width: `${100 / 7}%` }}>Revenue</h3>
                <h3 style={{ width: `${100 / 7}%` }}> </h3>
            </div>
            <div className="product-list">
                {data ? (
                    data.map(product => (
                        <div key={product.id} className="product">
                            <p style={{ width: `${100 / 3}%` }}>{product.title}</p>
                            <p style={{ width: `${100 / 7}%` }}>{product.price.toFixed(2)}</p>
                            <p style={{ width: `${100 / 7}%` }}>{product.category}</p>
                            <p style={{ width: `${100 / 7}%` }}>{product.rating.rate}</p>
                            <p style={{ width: `${100 / 7}%` }}>{product.inventory}</p>
                            <p style={{ width: `${100 / 7}%` }}>{(product.price * product.inventory).toFixed(2)}</p>
                            <p style={{ width: `${100 / 7}%` }}>
                                <button type="button" style={{ fontSize: '1vw' }} onClick={() => handleLearnMoreClick(product)}>Learn More</button>
                            </p>
                        </div>


                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            {/* Conditionally render ProductDetail component */}
            {selectedProduct && (
                <ProductDetail
                    product={selectedProduct}
                    onClose={handleCloseProductDetail}
                />
            )}
        </div>
    );
}

export default Products;