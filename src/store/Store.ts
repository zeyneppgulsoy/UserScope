import { create } from "zustand";
import type { PhotoParams } from "../pages/AlbumDetailPage";
import { persist } from "zustand/middleware";

interface Store {
  favorites: PhotoParams[];
  addFavorite: (photo: PhotoParams) => void;
  removeFavorites: (id: number) => void;
}

export const useStore = create<Store>()(
  persist<Store>(
    (set) => ({
      favorites: [],
      addFavorite: (photo: PhotoParams) =>
        set((state) => ({
          favorites: [...state.favorites, photo],
        })),
      removeFavorites: (id: number) =>
        set((state) => ({
          favorites: state.favorites.filter((photo) => photo.id !== id),
        })),
    }),
    {
      name: "favorites-storage",
    }
  )
);
