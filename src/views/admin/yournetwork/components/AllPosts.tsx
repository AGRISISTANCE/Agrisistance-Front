// import images temporarely
import farmer from './assets/farmer.jpg';
import tool from './assets/tool.jpg';
import land from './assets/land.jpg';


// components/AllPosts.tsx
import React from 'react';
import PostCard from './PostCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store'; 

interface AllPostsProps {
  category?: string;
}

const AllPosts: React.FC<AllPostsProps> = ({ category }) => {
  const posts = useSelector((state: RootState) => state.posts);
  const Pictures = {
    farmer,
    land,
    tool
  };

  // Check posts here
  console.log('Current Posts State:', posts);

  return (
    <div>
      {posts
        .filter(post => post.type === (category || post.type)) // Filter by category if provided
        .map(post => {
          // Type guard to ensure post.authorPicture is a valid key          
          // Log the entire post object to inspect its properties
          console.log('Post Object:', post);

          // Log the value of post.authorPicture
          console.log('Author Picture Key:', post.image);

          // Get the picture based on post.authorPicture
          const authorPicture = Pictures[post.authorPicture as keyof typeof Pictures];
          const postPicture = Pictures[post.image as keyof typeof Pictures];

          // Log the picture path or undefined
          console.log('Resolved Picture for author : ', authorPicture);
          console.log('Resolved Picture for post : ', postPicture);


          return (
            <PostCard
              key={post.postID}
              author={{
                profilePicture: authorPicture, // Use the resolved image or fallback
                name: post.authorName,
                country: post.authorCountry,
                phoneNumber: post.authorPhoneNumber,
              }}
              content={{
                category: post.type,
                title: post.title,
                description: post.description,
                image: postPicture, // Assuming the first image is the main content image
                date: post.postDate,
              }}
            />
          );
        })}
    </div>
  );
};

export default AllPosts;
