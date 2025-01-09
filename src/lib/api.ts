interface PostData {
  id: number;
  value: number | boolean | string[];
  name: string;
}

export const postUpdate = (data: PostData) => {
  console.log('apiHandler', data);
};
