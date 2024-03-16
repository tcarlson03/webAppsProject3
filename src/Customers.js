import React, { useState, useEffect } from 'react';
import App from './App';

function Customers() {
    const [customerData, setCustomerData] = useState([]);
    const [productData, setProductData] = useState([]);
    const [hoverIndex, setHoverIndex] = useState(null);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [clickCount, setClickCount] = useState(0);

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
        const headerElements = document.querySelectorAll('.column-titles h3');
        headerElements.forEach((headerElement, index) => {
            headerElement.style.backgroundColor = '#e0e0e0';
            headerElement.style.padding = '10px';
            headerElement.style.margin = '0px';
            headerElement.style.border = '1px solid #FFFFFF';

            if (index === 0) {
                headerElement.style.borderTopLeftRadius = '10px';
                headerElement.style.borderBottomLeftRadius = '10px';
            } else if (index === headerElements.length - 1) {
                headerElement.style.borderTopRightRadius = '10px';
                headerElement.style.borderBottomRightRadius = '10px';
            }

            if (index === 3) {
                headerElement.style.textAlign = 'right';
            } else {
                headerElement.style.textAlign = 'left';
            }
        });
    }, []);

    useEffect(() => {
        const headerElement = document.querySelector('.column-titles');
        if (headerElement) {
            headerElement.style.display = 'flex';
            headerElement.style.flexDirection = 'row';
            headerElement.style.gap = '0px';
            headerElement.style.marginRight = '21px';
            headerElement.style.marginLeft = '21px';
        }
    }, []);

    useEffect(() => {
        const sectionElements = document.querySelectorAll('.customer');
        sectionElements.forEach((sectionElement, index) => {
            sectionElement.style.display = 'flex';
            sectionElement.style.paddingLeft = '10px';
            sectionElement.style.paddingRight = '10px';
        });
    }, [customerData, hoverIndex]);

    useEffect(() => {
        const customerContainers = document.querySelectorAll('.customer p');
        customerContainers.forEach((customerContainer, index) => {
            customerContainer.style.border = '1px solid #FFFFFF';
            customerContainer.style.paddingLeft = '10px';
            customerContainer.style.paddingTop = '5px';
            customerContainer.style.paddingBottom = '5px';
            customerContainer.style.paddingRight = '10px';
            customerContainer.style.margin = '0px';

            if (index % 5 === 0) {
                customerContainer.style.borderTopLeftRadius = '10px';
                customerContainer.style.borderBottomLeftRadius = '10px';
            } else if (index % 5 === 4) {
                customerContainer.style.borderTopRightRadius = '10px';
                customerContainer.style.borderBottomRightRadius = '10px';
            }

            if (index % 5 === 3) {
                customerContainer.style.textAlign = 'right';
            } else {
                customerContainer.style.textAlign = 'left';
            }
        });
    }, [customerData, hoverIndex]);

    useEffect(() => {
        const customerContainers = document.querySelectorAll('.customer p');
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
            customerListElement.style.paddingLeft = '10px';
            customerListElement.style.paddingRight = '10px';
            customerListElement.style.paddingBottom = '30px';
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

    const handleSort = (column) => {
        if (sortColumn === column) {
            if (clickCount === 2) {
                setSortColumn(null);
                setSortOrder('asc');
                setClickCount(0);
            } else {
                setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                setClickCount(clickCount + 1);
            }
        } else {
            setSortColumn(column);
            setSortOrder('asc');
            setClickCount(1);
        }
    };

    const getSortSymbol = (column) => {
        if (sortColumn === column) {
            if (clickCount === 0) {
                return '⇑';
            } else if (clickCount === 1) {
                return sortOrder === 'asc' ? '⇑' : '⇓';
            } else {
                return '⇓';
            }
        }
        return '⇕';
    };

    const sortedCustomerData = [...customerData].sort((a, b) => {
        if (sortColumn === 'name') {
            const nameA = `${a.name.title} ${a.name.first} ${a.name.last}`.toLowerCase();
            const nameB = `${b.name.title} ${b.name.first} ${b.name.last}`.toLowerCase();
            return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
        } else if (sortColumn === 'address') {
            const addressA = `${a.location.street.number} ${a.location.street.name}, ${a.location.city}, ${a.location.state}, ${a.location.postcode}, ${a.location.country}`.toLowerCase();
            const addressB = `${b.location.street.number} ${b.location.street.name}, ${b.location.city}, ${b.location.state}, ${b.location.postcode}, ${b.location.country}`.toLowerCase();
            return sortOrder === 'asc' ? addressA.localeCompare(addressB) : addressB.localeCompare(addressA);
        } else if (sortColumn === 'email') {
            return sortOrder === 'asc' ? a.email.localeCompare(b.email) : b.email.localeCompare(a.email);
        } else if (sortColumn === 'revenue') {
            const revenueA = getTotalPurchasesValue(a.purchases);
            const revenueB = getTotalPurchasesValue(b.purchases);
            return sortOrder === 'asc' ? revenueA - revenueB : revenueB - revenueA;
        }
        return 0;
    });
    useEffect(() => {
        const customerContainers = document.querySelectorAll('.customer p');
        customerContainers.forEach((customerContainer, index) => {
            const rowIndex = Math.floor(index / 5);
            if (rowIndex % 2 === 0) {
                if (hoverIndex === rowIndex) {
                    customerContainer.style.backgroundColor = '#dee9f4';
                } else {
                    customerContainer.style.backgroundColor = '#ffffff';
                }
            } else {
                if (hoverIndex === rowIndex) {
                    customerContainer.style.backgroundColor = '#dee9f4';
                } else {
                    customerContainer.style.backgroundColor = '#e0e0e0';
                }
            }
        });
    }, [sortedCustomerData, hoverIndex]);

    return (
        <div className="App">
            <App />
            <h2>Customers</h2>
            {/* Header */}
            <div className="column-titles">
                <h3 style={{ width: '20%' }} onClick={() => handleSort('name')}>
                    Name {getSortSymbol('name')}
                </h3>
                <h3 style={{ width: '25%' }} onClick={() => handleSort('address')}>
                    Address {getSortSymbol('address')}
                </h3>
                <h3 style={{ width: '25%' }} onClick={() => handleSort('email')}>
                    Email {getSortSymbol('email')}
                </h3>
                <h3 style={{ width: '20%', textAlign: 'right' }} onClick={() => handleSort('revenue')}>
                    Revenue {getSortSymbol('revenue')}
                </h3>
                <h3 style={{ width: '10%', textAlign: 'center' }}></h3>
            </div>
            {/* Customer rows */}
            <section className="customer-list">
                {sortedCustomerData.map((customer, index) => (
                    <section
                        key={`${customer.name.first}-${customer.name.last}-${customer.email}`}
                        className="customer"
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <p style={{ width: '20%' }}>{`${customer.name.title} ${customer.name.first} ${customer.name.last}`}</p>
                        <p style={{ width: '25%' }}>{`${customer.location.street.number} ${customer.location.street.name}, ${customer.location.city}, ${customer.location.state}, ${customer.location.postcode}, ${customer.location.country}`}</p>
                        <p style={{ width: '25%'  }}>{customer.email}</p>
                        <p style={{
                            width: '20%',
                            textAlign: 'right'
                        }}>{getTotalPurchasesValue(customer.purchases).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}</p>
                        <p style={{ width: '10%', display: 'grid', justifyContent: 'center' }}>
                            <img src={customer.picture.thumbnail} alt={`${customer.name.first} ${customer.name.last}`}
                                 style={{ borderRadius: '50%' }} />
                        </p>
                    </section>
                ))}
            </section>
        </div>
    );
}

export default Customers;
