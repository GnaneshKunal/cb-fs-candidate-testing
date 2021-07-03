import jobs from '../../data/jobs'

function hasSearchTerm(searchTerm, data, skipArray=false) {
  const type = typeof(data);
  switch (type) {
  case 'string':
    return data.toLowerCase().indexOf(searchTerm) !== -1;
  case 'number':
    return data.toString().indexOf(searchTerm) !== -1;
  case 'object':
    const isArr = Array.isArray(data);
    if (isArr) {
      if (skipArray) {
        return false;
      } else {
        return data.some(v => hasSearchTerm(searchTerm, v, skipArray));
      }
    } else {
      const values = Object.values(data);
      return values.some(v => hasSearchTerm(searchTerm, v, skipArray));
    }
  }
}

function hasProperty(j, props) {
  const { type, department, workSchedule, experience } = props;

  if (type) {
    return type === j.job_type;
  }

  if (department) {
    return j.department.includes(department);
  }

  if (workSchedule) {
    return workSchedule === j.work_schedule;
  }

  if (experience) {
    return experience === j.experience;
  }

  // if no property was passed as requried, then simply return `true`
  return true;
}

export default async (req, res) => {

  let queryParams = {...req.query};
  Object.keys(queryParams).map(k => decodeURIComponent(queryParams[k]));

  let { search, type, department, workSchedule, experience, sortBy } = queryParams
  search = (search || '').toLowerCase();

  let filteredJobs = search ? jobs.map(job => {

    if (hasSearchTerm(search, Object.values(job), true)) {
      return job;
    }

    const newJob = {
      ...job,
      items: job.items.filter(j => hasSearchTerm(search, j, false)).filter(j => hasProperty(j, req.query))
    };

    if (newJob.items.length !== 0) {
      return newJob;
    } else {
      return null;
    }
  }).filter(j => j !== null) : jobs.map(job => ({...job, items: job.items.filter(j => hasProperty(j, req.query))})).filter(j => j.items.length > 0);

  // sort by logic
  if (sortBy) {
    let [sort, order] = sortBy.split(':');

    const sortByOrder = (a, b, order) => {
      if (a == b) return 0;
      return order == 'asc' ? a > b ? 1 : -1 : a < b ? 1 : -1;
    }

    const sortByToProp = {
      'Experience': 'experience',
      'Location': 'zip',
      'Role': 'job_title',
    }

    filteredJobs = filteredJobs.map(job => {
      job.items = job.items.sort((a, b) => sortByOrder(a[sortByToProp[sort]], b[sortByToProp[sort]], order));
      return job;
    });
  }

  res.statusCode = 200

  // this timeout emulates unstable network connection, do not remove this one
  // you need to figure out how to guarantee that client side will render
  // correct results even if server-side can't finish replies in the right order
  await new Promise((resolve) => setTimeout(resolve, 1000 * Math.random()))

  res.json({jobs: filteredJobs})
}
