import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const isDarkAtom = atom({
  key: "isDark",
  default: false,
});

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  text: string;
  category: Categories;
  id: number;
}

export interface ICustomCat {
  name: string;
  text: string;
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

//default에다가 localStorage 사용
export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const customCategoryState = atom<ICustomCat[]>({
  key: "customCat",
  default: [
    { name: Categories.TO_DO, text: "To do" },
    { name: Categories.DOING, text: "Doing" },
    { name: Categories.DONE, text: "Done" },
  ],
  effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
