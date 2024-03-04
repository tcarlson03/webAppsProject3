import React from 'react';
import {Link} from "react-router-dom"

export default function Navigation() {

    let links = [
        {href:"/Products", text: "Products"},
        {href:"/Customers", text: "Customer Analytics"},
        {href:"/Team", text: "The Team"}
    ]
    return (
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
    );
}

