import { useState } from 'react';

import Layout from '../components/Layout';
import TypeSection from '../components/TypeSection';
import JobsPosting from '../components/JobsPosting';
import SearchBar from '../components/SearchBar';

import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

function Index() {

  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [department, setDepartment] = useState('');
  const [workSchedule, setWorkSchedule] = useState('');
  const [experience, setExperience] = useState('');
  const [sortBy, setSortBy] = useState('');
  const { data: filterData, error: filterError } = useSWR('/api/filters', fetcher);
  const { data: jobsData, error: jobsError } = useSWR(`/api/jobs?search=${encodeURIComponent(search)}&sortBy=${sortBy}&type=${encodeURIComponent(type)}&workSchedule=${encodeURIComponent(workSchedule)}&experience=${encodeURIComponent(experience)}&department=${encodeURIComponent(department)}`, fetcher);

  return (
    <Layout>
      <div>
        <div className='bg-white shadow sm:m-3 sm:p-2'>
          <SearchBar onChange={e => setSearch(e.target.value)} />
        </div>
        <div className='flex'>
          <div className='hidden sm:block'>
            {
              !filterData ?
              <div className='bg-white shadow h-full flex justify-center items-center m-3 p-2'>
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20"></div>
              </div>
              :
              <>
                <TypeSection
                  name={'Job Type'}
                  data={filterData.job_type}
                  onClick={(type) => {
                    setType(type);
                    setDepartment('');
                    setWorkSchedule('');
                    setExperience('');
                  }}
                  selected={type || department || workSchedule || experience}
                />
                <TypeSection
                  name={'Department'}
                  data={filterData.department}
                  onClick={(dep) => {
                    setType('');
                    setWorkSchedule('');
                    setExperience('');
                    setDepartment(dep);
                  }}
                  selected={type || department || workSchedule || experience}
                />
                <TypeSection
                  name={'Work Schedule'}
                  data={filterData.work_schedule}
                  onClick={(ws) => {
                    setType('');
                    setExperience('');
                    setDepartment('');
                    setWorkSchedule(ws);
                  }}
                  selected={type || department || workSchedule || experience}
                />
                <TypeSection
                  name={'experience'}
                  data={filterData.experience}
                  onClick={(ex) => {
                    setType('');
                    setWorkSchedule('');
                    setDepartment('');
                    setExperience(ex);
                  }}
                  selected={type || department || workSchedule || experience}
                />
              </>
            }
          </div>
          <div className='w-full'>
            {
              !jobsData ?
              <div className='bg-white shadow h-full flex justify-center items-center sm:m-3 sm:p-2'>
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20"></div>
              </div>
              :
              <JobsPosting
                sortBy={sortBy}
                onSortChange={s => {
                  if (sortBy === '') setSortBy(s + ':asc');
                  else {
                    let [sort, order] = sortBy.split(':');
                    if (sort === s) {
                      if (order === 'dsc') {
                        setSortBy('');
                      } else {
                        setSortBy(sort + ':dsc');
                      }
                    } else {
                      setSortBy(sort + ':asc');
                    }
                  }
                }}
                jobsData={jobsData.jobs} />
            }
          </div>
        </div>
      </div>
      <style global jsx>{`
.loader {
  border-top-color: #3498db;
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spinner {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
      `}</style>
    </Layout>
  );
}

export default Index;
