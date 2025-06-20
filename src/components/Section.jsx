function Section({ children, id }) {
  return (
    <>
      <section
        className='mx-auto max-w-7xl px-6 py-8 sm:py-12 lg:px-8 '
        id={id}
      >
        {children}
      </section>
    </>
  );
}

export default Section;
