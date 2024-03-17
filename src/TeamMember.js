import './TeamMember.css';
import React, { useState } from 'react';

function TeamMember({name, image, description}) {
    const [flipped, setFlipped] = useState(false);

    const handleClick = () => {
        setFlipped(!flipped);
    };

    return (
        <div className="team-member" onClick={handleClick}>
            {flipped ? (
                <div className="team-member-details">
                    <h3>{name}</h3>
                    <p>123-456-7890</p>
                    <p>webapps@fit.edu</p>
                    <p>{description}</p>
                </div>
            ) : (
            <>
                <img src={image} alt={name} />
                <h3>{name}</h3>
            </>
        )}
    </div>
    );
}

export default TeamMember;