export type PostValue = number | boolean | string | string[];

export interface PostData {
  mqtt_id: number | number[];
  device_type_name: string;
  name: string;
  value: PostValue;
}

export const postUpdate = (data: PostData) => {
  console.log('apiHandler', data);
};
