import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Post {
  postID: string;
  Title: string;
  type: 'opportuntitiesAndPartnership' | 'businessPromotion' | 'ressourcesAndProducts';
  Description: string;
  images: string[];
  authorId: string; //userID
  authorName: string;
  authorPhoneNumber: string;
  authorCountry: string;
  postDate: string;
  active: Boolean;// true for active, false for archived
}

const initialState: Post[] = [];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      state.push(action.payload);
    },
    updatePost: (state, action: PayloadAction<{ index: number; updates: Partial<Post> }>) => {
      const post = state[action.payload.index];
      if (post) {
        Object.assign(post, action.payload.updates);
      }
    },
    removePost: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1);
    },
  },
});

export const { addPost, updatePost, removePost } = postsSlice.actions;
export default postsSlice.reducer;
