import React, {useEffect} from 'react';
import {Link} from "react-router-dom"

export default function Navigation() {

    let links = [
        {href:"/Products", text: "Products"},
        {href:"/Customers", text: "Customer Analytics"},
        {href:"/Team", text: "The Team"}
    ]
    return (
        <header className="App-header">
            <h1 className="page-title">Inventory Management System (IMS)</h1>
            <nav>
                <ul>
                    {
                        links.map(link => (
                            <li key={link.href}>
                                <Link to={link.href}>
                                    {link.text}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </header>
    );
}

