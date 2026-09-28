function TagTool({ children }: { children: string }) {
    return (
        <span className='border border-neutral-100 rounded-4xl px-3 py-1 text-sm'>
            {children}
        </span>
    );
}

export default TagTool;
