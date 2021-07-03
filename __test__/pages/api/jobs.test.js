import handler from '../../../pages/api/jobs'
import { createRequest, createResponse } from 'node-mocks-http'

it('Simple request should return 200', async () => {

  const req = createRequest({
    url: `/api/jobs`,
  });

  const res = createResponse()

  await handler(req, res)

  expect(res.statusCode).toBe(200)
});

it('Simple search should work', async () => {

  const searchString = 'mammo';

  const req = createRequest({
    url: `/api/jobs?search=${searchString}`,
  });

  const res = createResponse()

  await handler(req, res)

  expect(res.statusCode).toBe(200);

  const jobs = await res._getJSONData().jobs;

  expect(jobs[0].name.toLowerCase()).toMatch(searchString)
});

it('Filter by job type should work', async () => {

  const type = 'Full-time';

  const req = createRequest({
    url: `/api/jobs?type=${type}`,
  });

  const res = createResponse()

  await handler(req, res)

  expect(res.statusCode).toBe(200);

  const jobs = await res._getJSONData().jobs;

  expect(jobs[0].items[0].job_type).toMatch(type)
});

it('Filter by department should work', async () => {

  const department = 'Urology';

  const req = createRequest({
    url: `/api/jobs?department=${department}`,
  });

  const res = createResponse()

  await handler(req, res)

  expect(res.statusCode).toBe(200);

  const jobs = await res._getJSONData().jobs;

  expect(jobs[0].items[0].department).toContain(department);
});


it('Filter by work schedule should work', async () => {

  const workSchedule = 'Day shift';

  const req = createRequest({
    url: `/api/jobs?workSchedule=${encodeURIComponent(workSchedule)}`,
  });

  const res = createResponse()

  await handler(req, res)

  expect(res.statusCode).toBe(200);

  const jobs = await res._getJSONData().jobs;

  expect(jobs[0].items[0].work_schedule).toContain(workSchedule);
});

it('Sort by experience ascending schedule should work', async () => {

  const experience = 'Experience:asc';

  const req = createRequest({
    url: `/api/jobs?sortBy=${encodeURIComponent(experience)}`,
  });

  const res = createResponse()

  await handler(req, res)

  expect(res.statusCode).toBe(200);

  const jobs = await res._getJSONData().jobs;

  expect(jobs[0].items[0].experience).toBe('Intermediate');
});

it('Sort by experience descending schedule should work', async () => {

  const experience = 'Experience:dsc';

  const req = createRequest({
    url: `/api/jobs?sortBy=${encodeURIComponent(experience)}`,
  });

  const res = createResponse()

  await handler(req, res)

  expect(res.statusCode).toBe(200);

  const jobs = await res._getJSONData().jobs;

  expect(jobs[0].items[0].experience).toBe('Senior');
});
