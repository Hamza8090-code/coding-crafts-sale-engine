import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchJobs() {
      let { data } = await supabase.from('jobs').select('*');
      setJobs(data || []);
    }
    fetchJobs();
  }, []);

  const updateJobStatus = async (jobId, status) => {
    const { error } = await supabase
      .from('jobs')
      .update({ status })
      .eq('id', jobId);

    if (error) {
      alert('Error updating status: ' + error.message);
    } else {
      setJobs(jobs.map((job) => (job.id === jobId ? { ...job, status } : job)));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Job Tracking Dashboard</h1>
      {jobs.length === 0 ? (
        <p>No jobs hunted yet.</p>
      ) : (
        jobs.map((job) => (
          <div key={job.id} className="border p-4 mb-2">
            <p>
              <strong>{job.title}</strong> at {job.companyName}
            </p>
            <p>Status: {job.status || 'Pending'}</p>
            <select
              className="border p-2 mt-2"
              onChange={(e) => updateJobStatus(job.id, e.target.value)}
              defaultValue={job.status || 'Pending'}
            >
              <option value="Pending">Pending</option>
              <option value="First Interview">First Interview</option>
              <option value="Second Interview">Second Interview</option>
              <option value="Third Interview">Third Interview</option>
              <option value="Rejected">Rejected</option>
              <option value="Developer Missed">Developer Missed</option>
              <option value="Client Not Attended">Client Not Attended</option>
              <option value="No Response">No Response</option>
            </select>
          </div>
        ))
      )}
    </div>
  );
}
