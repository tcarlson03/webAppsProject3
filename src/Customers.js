import React, { useState, useEffect } from 'react';
import App from './App';

function Customers() {
    const [customerData, setCustomerData] = useState([]);
    const [productData, setProductData] = useState([]);
    const [hoverIndex, setHoverIndex] = useState(null);

    useEffect(() => {
        fetch('customers.json')
            .then(response => response.json())
            .then(data => setCustomerData(data))
            .catch(error => console.error('Error fetching customer data:', error));
    }, []);

    useEffect(() => {
        fetch('products.json')
            .then(response => response.json())
            .then(data => setProductData(data))
            .catch(error => console.error('Error fetching product data:', error));
    }, []);

    useEffect(() => {
        const headerElements = document.querySelectorAll('.header-item');
        headerElements.forEach((headerElement, index) => {
            headerElement.style.backgroundColor = '#e0e0e0';
            headerElement.style.padding = '10px';
            headerElement.style.margin = '0px';

            headerElement.style.border = '1px solid #FFFFFF';
            if (index === 3) {
                headerElement.style.textAlign = 'right';
            } else {
                headerElement.style.textAlign = 'left';
            }
        });
    }, []);

    useEffect(() => {
        const headerElement = document.querySelector('.title');
        if (headerElement) {
            headerElement.style.display = 'flex';
            headerElement.style.flexDirection = 'row';
            headerElement.style.paddingLeft = '19px';
            headerElement.style.paddingRight = '19px';

        }
    }, []);

    useEffect(() => {
        const sectionElements = document.querySelectorAll('section');
        sectionElements.forEach((sectionElement, index) => {
            sectionElement.style.display = 'flex';
            sectionElement.style.paddingLeft = '10px';
            sectionElement.style.paddingRight = '10px';
            sectionElement.style.marginBottom = '5px';
        });
    }, [customerData, hoverIndex]);

    useEffect(() => {
        const customerContainers = document.querySelectorAll('section p');
        customerContainers.forEach((customerContainer, index) => {
            customerContainer.style.border = '1px solid #FFFFFF';
            customerContainer.style.paddingLeft = '10px';
            customerContainer.style.paddingTop = '5px';
            customerContainer.style.paddingBottom = '5px';
            customerContainer.style.paddingRight = '10px';
            customerContainer.style.margin = '0px';
            if (index % 5 === 3) {
                customerContainer.style.textAlign = 'right';
            } else {
                customerContainer.style.textAlign = 'left';
            }
        });
    }, [customerData, hoverIndex]);

    useEffect(() => {
        const customerContainers = document.querySelectorAll('section p');
        customerContainers.forEach((customerContainer, index) => {
            if (Math.floor(index / 5) % 2 === 0) {
                if (hoverIndex === Math.floor(index / 5)) {
                    customerContainer.style.backgroundColor = '#dee9f4';
                } else {
                    customerContainer.style.backgroundColor = '#ffffff';
                }
            } else {
                if (hoverIndex === Math.floor(index / 5)) {
                    customerContainer.style.backgroundColor = '#dee9f4';
                } else {
                    customerContainer.style.backgroundColor = '#e0e0e0';
                }
            }
        });
    }, [customerData, hoverIndex]);

    useEffect(() => {
        const customerListElement = document.querySelector('.customer-list');
        if (customerListElement) {
            customerListElement.style.display = 'flex';
            customerListElement.style.flexDirection = 'column';
            customerListElement.style.padding = '10px';
        }
    }, []);

    const getTotalPurchasesValue = (customerPurchases) => {
        return customerPurchases.reduce((total, purchase) => {
            const product = productData.find(p => p.id === purchase.productID);
            return product ? total + (product.price * purchase.quantity) : total;
        }, 0);
    };

    const handleMouseEnter = index => {
        setHoverIndex(index);
    };

    const handleMouseLeave = () => {
        setHoverIndex(null);
    };

    return (
        <div className="App">
            <App />
            <h2>Customer Analytics</h2>
                {/* Header */}
                <div className="title">
                    <strong className="header-item" style={{ width: '20%' }}>Name</strong>
                    <strong className="header-item" style={{ width: '25%' }}>Address</strong>
                    <strong className="header-item" style={{ width: '25%' }}>Email</strong>
                    <strong className="header-item" style={{ width: '20%' }}>Revenue</strong>
                    <strong className="header-item" style={{ width: '10%' }}> </strong>
                </div>
                {/* Customer rows */}
                <div className="customer-list">
                    {customerData.map((customer, index) => (
                        <section key={customer.id} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>
                            <p style={{ width: '20%' }}>{`${customer.name.title} ${customer.name.first} ${customer.name.last}`}</p>
                            <p style={{ width: '25%' }}>{`${customer.location.street.number} ${customer.location.street.name}, ${customer.location.city}, ${customer.location.state}, ${customer.location.postcode}, ${customer.location.country}`}</p>
                            <p style={{ width: '25%' }}>{customer.email}</p>
                            <p style={{ width: '20%', textAlign: 'right' }}>{`$${getTotalPurchasesValue(customer.purchases).toFixed(2)}`}</p>
                            <p style={{ width: '10%', display: 'flex', justifyContent: 'center' }}>
                                <img src={customer.picture.thumbnail} alt={`${customer.name.first} ${customer.name.last}`} style={{ borderRadius: '50%' }} />
                            </p>
                        </section>
                    ))}
                </div>
        </div>
    );
}

export default Customers;
