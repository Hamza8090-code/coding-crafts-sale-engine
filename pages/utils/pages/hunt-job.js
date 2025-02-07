import { useState } from 'react';
import { supabase } from '../utils/supabase';
import dayjs from 'dayjs';

export default function HuntJob() {
  const [job, setJob] = useState({
    companyName: '',
    website: '',
    peopleCount: '',
    location: '',
    title: '',
    jdLink: '',
    jobType: 'Full-time'
  });

  const handleSubmit = async () => {
    const { error } = await supabase
      .from('jobs')
      .insert([{ ...job, huntedAt: dayjs().format('YYYY-MM-DD') }]);

    if (error) alert(error.message);
    else alert('Job successfully hunted!');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Hunt a Job</h1>
      <input type="text" placeholder="Company Name" className="border p-2" onChange={(e) => setJob({ ...job, companyName: e.target.value })} />
      <input type="text" placeholder="Company Website" className="border p-2" onChange={(e) => setJob({ ...job, website: e.target.value })} />
      <input type="number" placeholder="People Count" className="border p-2" onChange={(e) => setJob({ ...job, peopleCount: e.target.value })} />
      <input type="text" placeholder="Location" className="border p-2" onChange={(e) => setJob({ ...job, location: e.target.value })} />
      <input type="text" placeholder="Job Title" className="border p-2" onChange={(e) => setJob({ ...job, title: e.target.value })} />
      <input type="text" placeholder="JD Link" className="border p-2" onChange={(e) => setJob({ ...job, jdLink: e.target.value })} />
      <select className="border p-2" onChange={(e) => setJob({ ...job, jobType: e.target.value })}>
        <option>Full-time</option>
        <option>Remote</option>
        <option>Contract</option>
      </select>
      <button onClick={handleSubmit} className="bg-green-500 text-white p-2 mt-2 rounded">Save Job</button>
    </div>
  );
}
