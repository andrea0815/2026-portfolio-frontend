import React from 'react';

function Tag({ children }: { children: string }) {
    return (
        <p className='py-1 px-3 bg-neutral-100 rounded-4xl text-sm uppercase tracking-wider'>
            { children }
        </p>
    );
}

export default Tag;
