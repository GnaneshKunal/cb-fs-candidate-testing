export default function SearchBar(props) {
  return (
    <div className="flex border-grey-light">
      <span className="w-auto flex justify-end items-center text-grey p-2 hover:text-grey-darkest">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </span>
      <input onChange={props.onChange} className="w-full border-none ml-1" type="text" placeholder="Search for any job, title, keywoards or company" />
    </div>
  );
}
