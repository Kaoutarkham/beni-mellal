import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist } from "zustand/middleware";

export const useFavoritesStore = create(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (id) => {
        const newFavorites = [...get().favorites, id];
        set({ favorites: newFavorites });
      },

      removeFavorite: (id) => {
        const newFavorites = get().favorites.filter((f) => f !== id);
        set({ favorites: newFavorites });
      },

      isFavorite: (id) => get().favorites.includes(id),
    }),
    {
      name: "favorites-storage",
      getStorage: () => AsyncStorage,
    }
  )
);
