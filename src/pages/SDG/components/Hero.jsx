function Hero({ title, subtitle, description, image }) {
  return (
    <section className={`bg-sdg`}>
      <div className='grid max-w-screen-xl px-8 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12'>
        <div className='mr-auto place-self-center lg:col-span-7'>
          <h1 className='text-white max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl'>
            {title}
          </h1>
          <p className='max-w-2xl mb-6 font-light text-white lg:mb-8 md:text-sm lg:text-xl '>
            {subtitle}
          </p>
          <p className='max-w-2xl mb-6 font-light text-white lg:mb-8 md:text-sm/3 lg:text-md   '>
            {description}
          </p>
        </div>
        <div className='hidden lg:mt-0 lg:col-span-5 lg:flex aspect-square'>
          <img src={image} alt={title} className='' />
        </div>
      </div>
    </section>
  );
}

export default Hero;
