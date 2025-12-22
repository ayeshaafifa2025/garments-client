import React from 'react';
import logo from '../assets/garments logo.avif'
const Logo = () => {
    return (
        <div>
            <img src={logo}
                    className="w-20 h-20 rounded-full object-cover"
                    
                    alt="" />
        </div>
    );
};

export default Logo;