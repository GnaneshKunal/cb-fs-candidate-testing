import Link from 'next/link';
import { useState } from 'react';


export default function Header() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className='flex justify-between items-center p-2 pl-6 pr-6'>
      <div className='text-blue-400 font-bold'>{'HEALTH EXPLORE'}</div>
      <button onClick={() => setMenuOpen(!menuOpen)} className="inline-block sm:hidden w-8 h-8 bg-gray-200 text-gray-600 p-1">
        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
      </button>
      <div className={` ${menuOpen ? 'visible' : 'hidden'} sm:hidden absolute md:relative top-16 left-0 md:top-0 z-20 md:flex flex-col md:flex-row md:space-x-6 font-semibold w-full md:w-auto bg-white shadow-md rounded-lg md:rounded-none md:shadow-none md:bg-transparent p-6 pt-0 md:p-0`}
      >
        {
          ['profile', 'jobs', 'professional network', 'lounge', 'salary'].map(item => <span key={item} className="block py-1 text-xs text-black cursor-pointer">{item.toUpperCase()}</span>)
        }
      </div>
      <div className='hidden sm:visible sm:flex'>
        <button className='flex items-center shadow border-blue-500 border-2 rounded-xl px-4 py-2 text-blue-500 hover:bg-blue-500 hover:text-white mr-4'>Create Job</button>
        <span className="relative inline-block">
          <button className='rounded-full h-10 w-10 flex items-center justify-center bg-blue-500 text-white'>JO</button>
          <span className="absolute top-2 right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">1</span>
        </span>
        <button className='pl-2 pr-2 font-medium text-sm'>LOGOUT</button>
      </div>
    </div>
  );
}
