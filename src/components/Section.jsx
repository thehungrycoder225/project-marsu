function Section({ children, id, bg }) {
  return (
    <>
      <section
        className={`mx-auto max-w-7xl px-4 sm:py-8 lg:px-8 ${bg}`}
        id={id}
      >
        {children}
      </section>
    </>
  );
}

export default Section;
