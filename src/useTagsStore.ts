import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { Tag, TagMapping } from './interfaces';

const useTagsStore = create(
  combine(
    {
      tags: {} as TagMapping,
    },
    (set) => {
      return {
        addTagsData: (newTags: Tag[]) => {
          set((state) => ({
            tags: newTags,
          }));
        }
      };
    }
  )
);

export default useTagsStore;
