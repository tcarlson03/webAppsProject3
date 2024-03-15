import React, { useState, useEffect } from 'react';
import './App.css';
import ProductDetail from './ProductDetail';
import App from "./App"; // Import the ProductDetail component

function Products() {
    const [data, setData] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null); // State to track the selected product
    const [showProductDetail, setShowProductDetail] = useState(false);
    const [showSelectedProductIndex, setShowSelectedProductIndex] = useState(null);
    const [sortCategory, setSortCategory] = useState(null);
    const [sortDirection, setSortDirection] = useState('↑');

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

    const handleSort = category => {
        if (sortCategory === category) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortCategory(category);
            setSortDirection('asc');
        }
    };

            const getValue = (obj, key) => {
                if (key.includes('.')) {
                    return key.split('.').reduce((acc, cur) => acc[cur], obj);
                }
                return obj[key];
            };

    const sortedData = data
        ? [...data].sort((a, b) => {
              if (sortCategory) {
                  const aValue = getValue(a, sortCategory);
                  const bValue = getValue(b, sortCategory);

                  if (sortDirection === 'asc') {
                      return aValue < bValue ? -1 : 1;
                  } else {
                      return aValue > bValue ? -1 : 1;
                  }
              } else {
                  return 0;
              }
          })
        : [];

    useEffect(() => {
        const productContainer = document.querySelectorAll('.product');
        productContainer.forEach((productContainer) => {
            productContainer.style.display = 'flex';
            productContainer.style.paddingLeft = '10px';
            productContainer.style.paddingRight = '10px';
        });
    }, [data]);

    useEffect(() => {
        const productContainers = document.querySelectorAll('.product p');
        productContainers.forEach((productContainers, index) => {
            productContainers.style.border = '1px solid #FFFFFF';
            productContainers.style.paddingLeft = '10px';
            productContainers.style.paddingTop = '10px';
            productContainers.style.paddingBottom = '10px';
            productContainers.style.paddingRight = '10px';
            productContainers.style.margin = '0px';
            productContainers.style.fontSize = '1vw';
            if (index % 7 === 1 || index % 7 === 4 || index % 7 === 5) {
                productContainers.style.textAlign = 'right';
            } else {
                productContainers.style.textAlign = 'left';
            }

            if (Math.floor(index / 7) % 2 === 0) {
                if (showSelectedProductIndex === Math.floor(index / 7)) {
                    productContainers.style.backgroundColor = '#aaaaff'; //'#ffffff'
                }
                else {
                    productContainers.style.backgroundColor = '#ffffff'; //'#ffffff'
                }
                //productContainers.style.backgroundColor = '#ffffff'; //'#ffffff'
            } else {
                if (showSelectedProductIndex === Math.floor(index / 7)) {
                    productContainers.style.backgroundColor = '#aaaaff'; //'#ffffff'
                }
                else {
                    productContainers.style.backgroundColor = '#e0e0e0'; //'#ffffff'
                }
                //productContainers.style.backgroundColor = '#e0e0e0';
            }
        });
    }, [sortedData, showSelectedProductIndex]);

    useEffect(() => {
        const h3Element = document.querySelectorAll('h3');
        h3Element.forEach((h3Element, index) => {
            h3Element.style.backgroundColor = '#999999';
            h3Element.style.padding = '10px';
            h3Element.style.margin = '0px';
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
        const productTotal = document.querySelector('.selected');
        if (productTotal) {
            productTotal.style.backgroundColor = '#99ff99';
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

    const handleLearnMoreClick = (product, productIndex) => {
        // Update selectedProduct state with the clicked product
        setSelectedProduct(product);
        setShowProductDetail(true);
        setShowSelectedProductIndex(productIndex);
    };

    const handleCloseProductDetail = () => {
        // Clear the selected product and hide the ProductDetail component
        setSelectedProduct(null);
        setShowProductDetail(false);
        setShowSelectedProductIndex(null);
    };

// <h3 style={{ width: `${100 / 3}%` }}>Title</h3>
// <h3 style={{ width: `${100 / 7}%` }}>Category</h3>

    return (

        <div className="App">
            <App />
            <h2>Products</h2>
            <div className="column-titles">
                <h3 style={{ width: `${100 / 3}%`, cursor: 'pointer' }} onClick={() => handleSort('title')}>
                    Title ⇕ {sortCategory === 'title' && (sortDirection === 'asc')}
                </h3>
                <h3 style={{ width: `${100 / 7}%`, cursor: 'pointer' }} onClick={() => handleSort('price')}>
                    Price ⇕ {sortCategory === 'price' && (sortDirection === 'asc')}
                </h3>
                <h3 style={{ width: `${100 / 7}%`, cursor: 'pointer' }} onClick={() => handleSort('category')}>
                    Category ⇕ {sortCategory === 'category' && (sortDirection === 'asc')}
                </h3>
                <h3 style={{ width: `${100 / 7}%`, cursor: 'pointer' }} onClick={() => handleSort('rating.rate')}>
                    Rating ⇕ {sortCategory === 'rating.rate' && (sortDirection === 'asc')}
                </h3>
                <h3 style={{ width: `${100 / 7}%`, cursor: 'pointer' }} onClick={() => handleSort('inventory')}>
                    Inventory ⇕ {sortCategory === 'inventory' && (sortDirection === 'asc')}
                </h3>
                <h3 style={{ width: `${100 / 7}%`, cursor: 'pointer' }} onClick={() => handleSort('revenue')}>
                    Revenue ⇕ {sortCategory === 'revenue' && (sortDirection === 'asc')}
                </h3>
                <h3 style={{ width: `${100 / 7}%` }}> </h3>
            </div>
            <div className="product-list">
                {data ? (
                    sortedData.map((product, index) => (
                        <div key={product.id} className="product">
                            <p style={{ width: `${100 / 3}%` }}>{product.title}</p>
                            <p style={{ width: `${100 / 7}%` }}>{product.price.toFixed(2)}</p>
                            <p style={{ width: `${100 / 7}%` }}>{product.category}</p>
                            <p style={{ width: `${100 / 7}%` }}>{product.rating.rate}</p>
                            <p style={{ width: `${100 / 7}%` }}>{product.inventory.toLocaleString()}</p>
                            <p style={{ width: `${100 / 7}%` }}>
                            {(product.price * product.rating.count).toLocaleString(undefined, {
                                     minimumFractionDigits: 2,
                                     maximumFractionDigits: 2,
                            })}</p>
                            <p style={{ width: `${100 / 7}%` }}>
                                <button type="button" style={{ fontSize: '1vw' }} onClick={() => handleLearnMoreClick(product, index)}>Learn More</button>
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
