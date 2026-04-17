import { useMemo, useState, useEffect } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const HRAdminDashboard = () => {
  const today = useMemo(() => new Date(), []);
  const formattedDate = today.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Dummy data for metrics
  const dummyMetrics = [
    { title: 'Total Interns', value: '520', trend: '+15%', trendColor: 'text-emerald-600' },
    { title: 'Completed Interns', value: '1200', trend: '+8%', trendColor: 'text-emerald-600' },
    { title: 'Active Interns', value: '520', trend: '-5%', trendColor: 'text-rose-500' },
    { title: 'Partner Universities', value: '15', trend: '+20%', trendColor: 'text-emerald-600' },
  ];

  const [metrics, setMetrics] = useState(dummyMetrics);
  const [action, setAction] = useState('');

  const handleActionChange = (event) => {
    setAction(event.target.value);
  };

  // Commented out API call for metrics
  // useEffect(() => {
  //   fetch('/api/metrics')
  //     .then(res => res.json())
  //     .then(data => setMetrics(data))
  //     .catch(err => console.error('Error fetching metrics:', err));
  // }, []);

  // Dummy data for activities
  const dummyActivities = [
    { label: 'New application submitted', description: 'A fresh intern application arrived today.' },
    { label: 'Supervisor evaluation completed', description: 'Rating submitted for intern performance review.' },
    { label: 'New DTR submitted', description: 'Daily time record uploaded by intern.' },
    { label: 'MOA uploaded', description: 'Memorandum of agreement added to records.' },
  ];

  const [activities, setActivities] = useState(dummyActivities);

  // Commented out API call for activities
  // useEffect(() => {
  //   fetch('/api/activities')
  //     .then(res => res.json())
  //     .then(data => setActivities(data))
  //     .catch(err => console.error('Error fetching activities:', err));
  // }, []);

  // Dummy data for attendance
  const dummyAttendanceData = [
    { day: 'Mon', levels: [60, 40, 80] },
    { day: 'Tue', levels: [50, 85, 110] },
    { day: 'Wed', levels: [50, 70, 50] },
    { day: 'Thu', levels: [62, 82, 102] },
    { day: 'Fri', levels: [55, 78, 98] },
    { day: 'Sat', levels: [45, 65, 90] },
    { day: 'Sun', levels: [50, 68, 95] },
  ];

  const [attendanceData, setAttendanceData] = useState(dummyAttendanceData);

  // Commented out API call for attendance
  // useEffect(() => {
  //   fetch('/api/attendance')
  //     .then(res => res.json())
  //     .then(data => setAttendanceData(data))
  //     .catch(err => console.error('Error fetching attendance:', err));
  // }, []);

  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-4 lg:flex-row lg:items-start'>
        <div className='rounded-3xl bg-slate-950 px-6 py-8 text-white shadow-xl sm:flex-1'>
          <div className='flex items-start justify-between gap-4'>
            <div>
              <p className='text-sm text-slate-400'>Dashboard</p>
              <h1 className='mt-3 text-3xl font-semibold'>Hello, [Name]</h1>
              <p className='mt-1 text-sm text-slate-300'>Good morning</p>
            </div>
            <FormControl size='small' sx={{ minWidth: 170 }}>
              <InputLabel sx={{ color: 'rgba(255,255,255,0.8)' }}>Quick Action</InputLabel>
              <Select
                value={action}
                label='Quick Action'
                onChange={handleActionChange}
                sx={{
                  color: '#fff',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  borderRadius: '9999px',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255,255,255,0.2)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255,255,255,0.35)',
                  },
                  '& .MuiSvgIcon-root': {
                    color: '#fff',
                  },
                }}
              >
                <MenuItem value='addIntern'>Add Intern</MenuItem>
                <MenuItem value='generateReports'>Generate Reports</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className='mt-8 space-y-2 rounded-3xl bg-white/5 p-5'>
            <p className='text-sm uppercase tracking-[0.24em] text-slate-400'>Today</p>
            <p className='text-4xl font-semibold'>{formattedDate}</p>
          </div>
        </div>

        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-2 lg:flex-1'>
          {metrics.map((item) => (
            <div key={item.title} className='rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm'>
              <p className='text-sm font-medium text-slate-500'>{item.title}</p>
              <div className='mt-4 flex items-end justify-between gap-3'>
                <p className='text-3xl font-semibold text-slate-900'>{item.value}</p>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.trendColor} bg-slate-100`}>{item.trend}</span>
              </div>
              <p className='mt-2 text-xs text-slate-400'>Update: {formattedDate}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='grid gap-6 xl:grid-cols-[1.2fr_1fr]'>
        <div className='rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm'>
          <div className='flex items-center justify-between'>
            <div>
              <h2 className='text-xl font-semibold text-slate-900'>Recent Activity</h2>
              <p className='mt-1 text-sm text-slate-500'>Latest updates from your HR operations</p>
            </div>
          </div>
          <div className='mt-6 space-y-4'>
            {activities.map((activity) => (
              <div key={activity.label} className='flex items-start gap-4 rounded-3xl bg-slate-50 p-4'>
                <div className='mt-1 h-3 w-3 rounded-full bg-sky-500' />
                <div>
                  <p className='font-semibold text-slate-900'>{activity.label}</p>
                  <p className='mt-1 text-sm text-slate-500'>{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm'>
          <div className='flex items-center justify-between'>
            <div>
              <h2 className='text-xl font-semibold text-slate-900'>Attendance Overview</h2>
              <p className='mt-1 text-sm text-slate-500'>Today</p>
            </div>
            <div className='rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700'>Today</div>
          </div>
          <div className='mt-6 overflow-hidden rounded-3xl bg-slate-100 p-5'>
            <div className='flex items-end justify-between gap-3'>
              {attendanceData.map((item) => (
                <div key={item.day} className='flex flex-col items-center gap-2'>
                  <div className='flex h-70 w-12 flex-col justify-end gap-1 rounded-3xl bg-slate-200 p-1'>
                    <div className='rounded-full bg-rose-400' style={{ height: `${item.levels[2]}%` }} />
                    <div className='rounded-full bg-amber-400' style={{ height: `${item.levels[1]}%` }} />
                    <div className='rounded-full bg-violet-600' style={{ height: `${item.levels[0]}%` }} />
                  </div>
                  <span className='text-xs font-semibold uppercase text-slate-500'>{item.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRAdminDashboard;
