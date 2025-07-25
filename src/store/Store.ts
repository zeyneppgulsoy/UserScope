import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StorePhotoParams {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
    userId: number;
  }
  

interface Store {
  favorites: StorePhotoParams[];
  addFavorite: (photo: StorePhotoParams) => void;
  removeFavorites: (id: number) => void;
}

export const useStore = create<Store>()(
  persist<Store>(
    (set) => ({
      favorites: [],
      addFavorite: (photo: StorePhotoParams) =>
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
