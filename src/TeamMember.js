import React, { useState } from 'react';
import './App.css';

function TeamMember({name, image, description}) {
    const [flipped, setFlipped] = useState(false);

    const handleClick = () => {
        setFlipped(!flipped);
    };

    return (
        <div className="team-member">
            <>
                <img src={image} alt={name} />
            </>
                <div className="team-member-details">
                    <h3>{name}</h3>
                    <p>123-456-7890</p>
                    <p>webapps@fit.edu</p>
                    <p>{description}</p>
                </div>
    </div>
    );
}

export default TeamMember;