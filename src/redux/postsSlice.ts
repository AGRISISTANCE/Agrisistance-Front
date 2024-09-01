import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Post {
  postID: string;
  Title: string;
  type: 'opportunitiesAndPartnership' | 'businessPromotion' | 'resourcesAndProducts';
  Description: string;
  image: string;
  authorId: string; // userID
  authorName: string;
  authorPhoneNumber: string;
  authorCountry: string;
  authorPicture: string;
  postDate: string;
  active: boolean; // true for active, false for archived
}


// Flag to toggle between dummy and real data
const USE_DUMMY_DATA = false;

const initialDummyPosts: Post[] = [
  {
    postID: '1',
    Title: 'Innovative Farming Techniques',
    type: 'opportunitiesAndPartnership',
    Description: 'Explore new techniques to boost crop yield and sustainability.',
    image: 'farming1.jpg',
    authorId: 'c94fe502-79a0-4a6d-a533-9b72a28459ab',
    authorName: 'John Doe',
    authorPhoneNumber: '+1234567890',
    authorCountry: 'USA',
    authorPicture:'',
    postDate: '2024-08-30',
    active: true,
  },
  {
    postID: '2',
    Title: 'New Business Opportunities',
    type: 'businessPromotion',
    Description: 'Join us to explore exciting new business ventures.',
    image: 'business1.jpg',
    authorId: 'user2',
    authorName: 'Jane Smith',
    authorPhoneNumber: '+0987654321',
    authorCountry: 'Canada',
    authorPicture:'',
    postDate: '2024-08-29',
    active: true,
  },
  {
    postID: '3',
    Title: 'Agricultural Resources Available',
    type: 'resourcesAndProducts',
    Description: 'Access high-quality resources for agricultural productivity.',
    image: 'resources1.jpg',
    authorId: 'user3',
    authorName: 'Emily Johnson',
    authorPhoneNumber: '+1122334455',
    authorCountry: 'UK',
    authorPicture:'',
    postDate: '2024-08-28',
    active: false,
  },
  {
    postID: '4',
    Title: 'Agricultural Resources Available',
    type: 'resourcesAndProducts',
    Description: 'Access high-quality resources for agricultural productivity.',
    image: 'resources1.jpg',
    authorId: 'c94fe502-79a0-4a6d-a533-9b72a28459ab',
    authorName: 'Idriss fellah',
    authorPhoneNumber: '+1122334455',
    authorCountry: 'UK',
    authorPicture:'',
    postDate: '2024-08-28',
    active: false,
  },
  {
    postID: '5',
    Title: 'Agricultural Resources Available',
    type: 'resourcesAndProducts',
    Description: 'Access high-quality resources for agricultural productivity.',
    image: 'resources1.jpg',
    authorId: 'c94fe502-79a0-4a6d-a533-9b72a28459ab',
    authorName: 'Idriss fellah',
    authorPhoneNumber: '+1122334455',
    authorCountry: 'UK',
    authorPicture:'',
    postDate: '2024-08-28',
    active: false,
  },
];
const initialState: Post[] = USE_DUMMY_DATA ? initialDummyPosts : [];

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

