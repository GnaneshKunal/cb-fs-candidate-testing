import { useState } from 'react';
import { parseISO, format, formatDistance } from 'date-fns';

function JobDescription(props) {
  const { job } = props;

  if (job === null) return null;

  return (
    <div className='sm:flex pt-2 pb-2'>
      <div>
        <div className='sm:grid sm:grid-cols-3 pt-2 pb-2'>
          <div className='font-bold'>Department:</div>
          <div className='col-span-2'>{job.department.join()}</div>
        </div>
        <div className='sm:grid sm:grid-cols-3 pt-2 pb-2'>
          <div className='font-bold'>Hours / shifts:</div>
          <div className='col-span-2'>{job.work_schedule}</div>
        </div>
        <div className='sm:grid sm:grid-cols-3 pt-2 pb-2'>
          <div className='font-bold'>Summary:</div>
          <div className='col-span-2'>{job.description}</div>
        </div>
      </div>
      <div className='sm:flex flex-col w-6/12 self-center mr-auto'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm m-1'>Job details</button>
        <button className='w-100 border-blue-500 border-2 rounded px-4 py-2 text-blue-500 hover:bg-blue-500 hover:text-white pr-4 text-sm m-1'>Save job</button>
      </div>
    </div>
  );

}

export default function JobItem(props) {
  const { job } = props;
  const [showJobDescription, setShowJobDescription] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <div className='border-t-2 mt-4 mb-4 pt-2 pb-2'>
      <div
        onClick={() => setSelectedJob(selectedJob !== null ? null : job)}
        className='sm:flex items-center justify-between cursor-pointer'
      >
        <div>
          <div className='font-bold'>{job.job_title}</div>
          <div>
            <span>{job.job_type}</span>
            <span className='pl-1 pr-1'>|</span>
            <span>${job.salary_range[0]} - ${job.salary_range[1]} an hour</span>
            <span className='pl-1 pr-1'>|</span>
            <span>{job.city}</span>
          </div>
        </div>
        <div>{formatDistance(parseISO(job.created), new Date(), {addSuffix: true})}</div>
      </div>
      <div>
        <JobDescription job={selectedJob} />
      </div>
    </div>
  );
}
