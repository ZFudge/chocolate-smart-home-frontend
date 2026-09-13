export const VIEWS = {
  DEFAULT: 'default',
  NEW: 'new',
  EDIT: 'edit',
};

export const SCHEDULE_TYPES = [
  { value: 'cron', label: 'Cron' },
  { value: 'datetime', label: 'Datetime' },
  { value: 'time', label: 'Time' },
  { value: 'interval', label: 'Interval' },
];

export const SCHEDULE_TYPE_OPTIONS = SCHEDULE_TYPES.map((type) => ({
  value: type.value,
  label: type.label,
}));

export const CRON_TYPES = ['month', 'day', 'hour', 'minute', 'second'];
