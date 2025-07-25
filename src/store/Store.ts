import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface StorePhotoParams {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
    userId: number;
}

export interface StorePostParams {
    id: number;
    userId: number;
    title: string;
    body: string;
}

interface Store {
  favorites: StorePhotoParams[];
  favoritePosts: StorePostParams[];
  addFavorite: (photo: StorePhotoParams) => void;
  removeFavorites: (id: number) => void;
  addFavoritePost: (post: StorePostParams) => void;
  removeFavoritePost: (id: number) => void;
}

export const useStore = create<Store>()(
  persist<Store>(
    (set) => ({
      favorites: [],
      favoritePosts: [],
      addFavorite: (photo: StorePhotoParams) =>
        set((state) => ({
          favorites: [...state.favorites, photo],
        })),
      removeFavorites: (id: number) =>
        set((state) => ({
          favorites: state.favorites.filter((photo) => photo.id !== id),
        })),
      addFavoritePost: (post: StorePostParams) =>
        set((state) => ({
          favoritePosts: [...state.favoritePosts, post],
        })),
      removeFavoritePost: (id: number) =>
        set((state) => ({
          favoritePosts: state.favoritePosts.filter((post) => post.id !== id),
        })),
    }),
    {
      name: "favorites-storage",
    }
  )
);
