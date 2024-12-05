interface PostData {
  id: number;
  value: boolean | string[];
  name: string;
}

export const postUpdate = (data: PostData) => {
  console.log('apiHandler', data);
};
