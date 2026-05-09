import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function JobsPage(){
  const [jobs,setJobs]=useState([]);
  useEffect(()=>{axios.get('http://localhost:3000/jobs').then(r=>setJobs(r.data)).catch(()=>setJobs([]));},[]);
  return <div><h1>Browse Jobs</h1><ul>{jobs.map(j=><li key={j.id}>{j.title} - ${j.budgetMin}-${j.budgetMax}</li>)}</ul></div>;
}
