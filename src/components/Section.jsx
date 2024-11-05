function Section({ children, id }) {
  return (
    <section className='section' id={id}>
      {children}
    </section>
  );
}

export default Section;
