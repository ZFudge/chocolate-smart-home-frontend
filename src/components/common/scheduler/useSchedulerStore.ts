import { create } from 'zustand';
import { Job, View } from './interfaces';

export interface SchedulerStore {
  jobs: Record<string, Job>;
  addJob: (job: Job) => void;
  deleteJob: (job_id: string) => void;
  view: View;
  setView: (view: View) => void;
  setEditJob: (job_id: string | null) => void;
  editJob: Job | null;
}

const useSchedulerStore = create<SchedulerStore>((set) => ({
  jobs: {} as Record<string, Job>,
  addJob: (job: Job) => set((state) => ({ jobs: { ...state.jobs, [job.job_id]: job } })),
  deleteJob: (job_id: string) =>
    set((state) => ({
      jobs: Object.fromEntries(Object.entries(state.jobs).filter(([key]) => key !== job_id)),
    })),
  view: 'default' as View,
  setView: (view: View) => set({ view }),
  editJob: null,
  setEditJob: (job_id: string | null) =>
    set((state) => ({
      editJob: job_id ? state.jobs[job_id] : null,
      view: (job_id ? 'edit' : 'default') as View,
    })),
}));

export default useSchedulerStore;
