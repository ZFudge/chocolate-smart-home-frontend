import { VIEWS } from './views';

interface MessageKVP {
  key: string;
  value: any;
}

export interface Job {
  job_id: string;
  device_type_id: number;
  name: string;
  mqtt_ids: string[];
  message_kvp: MessageKVP;
  scheduler_kwargs: Record<string, any>;
  active: boolean;
}

export interface JobFormValuesType {
  job_id: string | null;
  name: string;
  mqtt_ids: string[];
  key: string;
  value: any;
  schedulerKwargs: Record<string, any>;
  active: boolean;
}

export interface JobRequestData {
  job_id?: string;
  device_type_name: string;
  name: string;
  mqtt_ids: number[];
  message_kvp: MessageKVP;
  scheduler_kwargs: Record<string, any>;
  active: boolean;
}

export type View = (typeof VIEWS)[keyof typeof VIEWS];
