import { atom, selector } from "recoil";

export const heroNamesState = atom({
  key: "heroNames",
  default: [] as any[]
})

export const heroNamesValue = selector({
  key: "heroNamesValue",
  get: ({ get }) => ({
    all: get(heroNamesState),
  }),
});