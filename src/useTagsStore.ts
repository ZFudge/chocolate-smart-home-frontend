import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { Tag } from './interfaces';

const useTagsStore = create(
  combine(
    {
      tags: [] as Tag[],
    },
    (set) => {
      return {
        addTagsData: (newTags: Tag[]) => {
          set(() => ({
            tags: newTags,
          }));
        }
      };
    }
  )
);

export default useTagsStore;
