function VFXSection({ children, id = "" }: { children: any, id?: string }) {
    return (
        <section className='max-w-[85vw] w-[800px] mb-[30dvh]' id={id}>
            {children }
        </section>
    );
}

export default VFXSection;
