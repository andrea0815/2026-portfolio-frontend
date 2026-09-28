function TagCategory({ children }: { children: string }) {
    return (
        // <span className='bg-neutral-100 rounded-4xl px-3 py-1 text-sm'>
        <span className='border border-neutral-300 rounded-4xl px-3 py-1 text-sm text-neutral-400'>
            {children}
        </span>

        //  <span className='text-neutral-400'>
        //     &#60;{children}&#62;
        // </span>
    );
}

export default TagCategory;
