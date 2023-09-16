import { create } from "zustand";


export const useStore = create((set) => ({
  messages: [],
  hideChat: true,
  currentUserID: "",
  hideChatPage: (newData) => set((state) => ({ hideChat: newData})),
  allMessages: (newData) => set((state) => ({ messages: newData })),
  myCurrentID: (newData) => set((state) => ({ currentUserID: newData })),
}));
