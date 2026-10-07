export const VIEWS = {
  DEFAULT: 'default',
  NEW: 'new',
  EDIT: 'edit',
};

export const SCHEDULE_TYPES = [
  { value: 'cron', label: 'Intervals' },
  { value: 'date', label: 'Datetime' },
  { value: 'time', label: 'Time' },
];

export const SCHEDULE_TYPE_OPTIONS = SCHEDULE_TYPES.map((type) => ({
  value: type.value,
  label: type.label,
}));

export const CRON_TYPES = ['month', 'day', 'hour', 'minute', 'second'];

export const ACTIVE = 'active';
export const INACTIVE = 'inactive';
export const EXPIRED = 'expired';
export type STATUS = typeof ACTIVE | typeof INACTIVE | typeof EXPIRED;
