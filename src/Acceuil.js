import React from 'react';

const Accueil = () => {
    const currentDate = new Date().toLocaleDateString();

    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <p>Today's date is: {currentDate}</p>
        </div>
    );
};

export default Accueil;
