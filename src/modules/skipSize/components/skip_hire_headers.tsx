import React from 'react';

interface SkipHireHeadersProps {
    header: string;
    subheader: string;
}
const SkipHireHeaders: React.FC<SkipHireHeadersProps> = ({ header, subheader }) => {
    return (
        <div className="mb-8">
                   <h1 className="text-4xl font-bold text-gray-800 mb-2">{header}</h1>
               <p className="text-gray-600">{subheader}</p>
             </div>
    );
};

export default SkipHireHeaders;