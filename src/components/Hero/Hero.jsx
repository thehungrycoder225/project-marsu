function Hero({ title, tagline, imageSrc, imageAlt }) {
  return (
    <div className='bg-gray-900'>
      <div className='relative isolate overflow-hidden pt-14'>
        <img
          src={imageSrc}
          alt={imageAlt}
          className='absolute inset-0 -z-10 h-full w-full object-cover'
        />
        <div
          className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
          aria-hidden='true'
        >
          <div
            className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className='mx-auto py-32 sm:py-48 lg:py-56'>
          <div className='text-center'>
            <h1 className=' font-bold tracking-tight text-white sm:text-5xl'>
              {title}
            </h1>
            <p className='mt-6  leading-8 text-gray-300 sm:text-2xl'>
              {tagline}
            </p>
            <div className='mt-10 flex items-center justify-center gap-x-6'>
              {/* <a
                href='#'
                className='rounded-md bg-college-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm'
              >
                Get started
              </a>
              <a
                href='#'
                className='text-sm font-semibold leading-6 text-white'
              >
                Learn more <span aria-hidden='true'>→</span>
              </a> */}
            </div>
          </div>
        </div>
        <div
          className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'
          aria-hidden='true'
        >
          <div
            className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#ff80b5] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]'
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
