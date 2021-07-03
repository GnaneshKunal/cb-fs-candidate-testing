export default function Footer() {
  return (
    <div className='sm:grid grid-cols-5 bg-white m-3 p-2'>
      <div className='col-span-3'>
        <h2 className='text-xl font-bold'>About us</h2>
        <p>We are a team of nurses, doctors, technologists and executives dedicated to help nurses find jobs that they love.</p>
        <p>All copyrights reserved (C) 2020 - Health Explore</p>
      </div>
      <div>
        <h2 className='text-xl font-bold'>Sitemap</h2>
        <ul className='list-none text-sm'>
          {
            ['Nurses', 'Employers', 'Social networking', 'Jobs'].map(item => <li key={item}>{item}</li>)
          }
        </ul>
      </div>
      <div>
        <h2 className='text-xl font-bold'>Privacy</h2>
        <ul className='list-none text-sm'>
          {
            ['Terms of use', 'Privacy policy', 'Cookie policy'].map(item => <li key={item}>{item}</li>)
          }
        </ul>
      </div>
    </div>
  );
}
