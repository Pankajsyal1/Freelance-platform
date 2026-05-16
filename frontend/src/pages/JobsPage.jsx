import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Briefcase, DollarSign, Calendar, Search } from 'lucide-react';
import useAuthStore from '../store/authStore';

export function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const { user } = useAuthStore();

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/jobs${search ? `?q=${search}` : ''}`);
      setJobs(response.data);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
      setJobs([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, [search]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Find Your Next Job</h1>
          <p className="text-muted-foreground">Browse through thousands of open opportunities.</p>
        </div>
        
        {user?.role === 'client' && (
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90">
            Post a Job
          </button>
        )}
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search for jobs, skills, or keywords..."
          className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl shadow-sm focus:ring-2 focus:ring-primary outline-none transition-all"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="grid gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-40 bg-muted animate-pulse rounded-xl border border-border"></div>
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-20 bg-card rounded-xl border border-dashed border-border">
          <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No jobs found</h3>
          <p className="text-muted-foreground">Try adjusting your search filters.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <div key={job.id} className="bg-card p-6 rounded-xl border border-border shadow-sm hover:border-primary/50 transition-colors group cursor-pointer">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold group-hover:text-primary transition-colors">{job.title}</h2>
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium capitalize">
                  {job.status.replace('_', ' ')}
                </div>
              </div>
              
              <p className="text-muted-foreground line-clamp-2 mb-4">
                {job.description}
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  <span>${job.budgetMin} - ${job.budgetMax}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                </div>
                {job.skills && (
                  <div className="flex gap-2">
                    {job.skills.slice(0, 3).map(skill => (
                      <span key={skill} className="bg-secondary text-secondary-foreground px-2 py-0.5 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
