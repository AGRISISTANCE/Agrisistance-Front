import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Post {
  postID: string;
  title: string;
  type: 'opportunitiesAndPartnership' | 'businessPromotion' | 'resourcesAndProducts';
  description: string;
  image: string;
  authorId: string; // userID
  authorName: string;
  authorPhoneNumber: string;
  authorCountry: string;
  authorPicture: string;
  postDate: string;
  active: boolean; // true for active, false for archived
}

export type CategoryType = 'opportunitiesAndPartnership' | 'businessPromotion' | 'resourcesAndProducts';

// Flag to toggle between dummy and real data
const USE_DUMMY_DATA = true;

const initialDummyPosts: Post[] = [
  {
    postID: '1',
    title: 'Innovative Farming Techniques',
    type: 'opportunitiesAndPartnership',
    description: 'Explore new techniques to boost crop yield and sustainability.',
    image: 'land',
    authorId: 'c94fe502-79a0-4a6d-a533-9b72a28459ab',
    authorName: 'John Doe',
    authorPhoneNumber: '+1234567890',
    authorCountry: 'USA',
    authorPicture:'farmer',
    postDate: '2024-08-30',
    active: true,
  },
  {
    postID: '2',
    title: 'New Business Opportunities',
    type: 'businessPromotion',
    description: 'Join us to explore exciting new business ventures.',
    image: 'land',
    authorId: 'user2',
    authorName: 'Jane Smith',
    authorPhoneNumber: '+0987654321',
    authorCountry: 'Canada',
    authorPicture:'farmer',
    postDate: '2024-08-29',
    active: true,
  },
  {
    postID: '3',
    title: 'Agricultural Resources Available',
    type: 'resourcesAndProducts',
    description: 'Access high-quality resources for agricultural productivity.',
    image: 'land',
    authorId: 'user3',
    authorName: 'Emily Johnson',
    authorPhoneNumber: '+1122334455',
    authorCountry: 'UK',
    authorPicture:'farmer',
    postDate: '2024-08-28',
    active: false,
  },
  {
    postID: '4',
    title: 'Agricultural Resources Available',
    type: 'resourcesAndProducts',
    description: 'Access high-quality resources for agricultural productivity.',
    image: 'land',
    authorId: 'c94fe502-79a0-4a6d-a533-9b72a28459ab',
    authorName: 'Idriss fellah',
    authorPhoneNumber: '+1122334455',
    authorCountry: 'UK',
    authorPicture:'farmer',
    postDate: '2024-08-28',
    active: false,
  },
  {
    postID: '5',
    title: 'Agricultural Resources Available',
    type: 'resourcesAndProducts',
    description: 'Access high-quality resources for agricultural productivity.',
    image: 'tool',
    authorId: 'c94fe502-79a0-4a6d-a533-9b72a28459ab',
    authorName: 'Idriss fellah',
    authorPhoneNumber: '+1122334455',
    authorCountry: 'UK',
    authorPicture:'farmer',
    postDate: '2024-08-28',
    active: false,
  },
];
const initialState: Post[] = USE_DUMMY_DATA ? initialDummyPosts : [];
// const initialState: Post[] = initialDummyPosts;

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      return action.payload;
    },
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

export const {setPosts, addPost, updatePost, removePost } = postsSlice.actions;
export default postsSlice.reducer;

