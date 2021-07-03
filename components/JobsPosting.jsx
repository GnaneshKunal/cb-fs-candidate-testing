import JobsList from './JobsList';

export default function JobsPosting(props) {
  const { jobsData, onSortChange, sortBy } = props;

  let sort = '';
  let order = '';

  if (sortBy !== '') {
    [sort, order] = sortBy.split(':');
  }

  const jobsCount = Object.values(jobsData).reduce((a, {items}) => a + items.length, 0);

  return (
    <div className='bg-white shadow sm:m-3 sm:p-2'>
      <div className='flex justify-between p-4'>
        <div><b>{jobsCount}</b> job postings</div>
        <div className='hidden sm:flex sm:visible'>
          <div className='text-gray-500'>Sort by</div>
          {
            ['Location', 'Role', 'Department', 'Education', 'Experience'].map(i =>
              <div onClick={() => onSortChange(i)} key={i} className={`pl-4 flex ${sort === i ? 'font-bold' : ''}`}>
                <div>{i}</div>
                {
                  sort === i ?
                  order === 'asc' ?
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                    :
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  :
                  null
                }
              </div>
            )
          }
        </div>
      </div>
      <div>
        {
          jobsData.map(job => <JobsList key={job.name} job={job} />)
        }
      </div>
    </div>
  );

}
