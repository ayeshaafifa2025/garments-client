import React from 'react';

const Error = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-red-600 mb-6">Page Not Found</h1>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6XO5r7MxdA-cPivNfdQCPO_kErvhKFsZMOH15EoS8b7KjknXtSx2kZhA&s"
                alt="404 Error"
                className="w-full max-w-md object-contain"
            />
           
        </div>
    );
};

export default Error;
