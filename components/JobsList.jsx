import { useState } from 'react';

import JobItem from './JobItem';

export default function JobsList(props) {
  const { job } = props;
  const [showJobs, setShowJobs] = useState(false);

  return (
    <div className='p-2'>
      <div className='cursor-pointer' onClick={() => setShowJobs(!showJobs)}><span className='rounded-md font-mono py-1 px-2 mr-5 text-white bg-gray-500'>{job.name.substring(0,2).toUpperCase()}</span>{job.items.length} jobs for {job.name}</div>
      {
        showJobs &&
        <div>
          {
            job.items.map(item => <JobItem key={item.job_title} job={item}/>)
          }
        </div>
      }
    </div>
  );

}
