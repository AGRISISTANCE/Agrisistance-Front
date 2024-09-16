// import images temporarely
import farmer from './assets/farmer.jpg';
import tool from './assets/tool.jpg';
import land from './assets/land.jpg';
import defaultImages from './assets/defaultImages'; // Import default images

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

  const categoryImages: Record<string, string> = {
    businessPromotion: defaultImages.business,
    opportunitiesAndPartnership: defaultImages.partner,
    resourcesAndProducts: defaultImages.products,
  };

  // // Function to get the default image based on category
  // const getCategoryImage = (category: string) => categoryImages[category] || defaultImages.products; // Fallback image


  // Check posts here
  console.log('Current Posts State:', posts);

  return (
    <div>
      {posts
        .filter(post => post.type === (category || post.type)) // Filter by category if provided
        .map(post => {
          
          // Get the default image for the post type
          const postImage = categoryImages[post.type] || defaultImages.products;

          // Use the default avatar if no author picture is provided
          // const authorPicture = post.authorPicture ? post.authorPicture : defaultImages.avatar;
          const authorPicture = defaultImages.avatar;

          // Type guard to ensure post.authorPicture is a valid key          
          // Log the entire post object to inspect its properties
          console.log('Post Object:', post);

          // Log the value of post.authorPicture
          console.log('Author Picture Key:', post.image);


          // ! Commented because of default images
          // Get the picture based on post.authorPicture
          // const authorPicture = Pictures[post.authorPicture as keyof typeof Pictures];
          // const postPicture = Pictures[post.image as keyof typeof Pictures];

          // Log the picture path or undefined
          // console.log('Resolved Picture for author : ', authorPicture);
          // console.log('Resolved Picture for post : ', postPicture);


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
                image: postImage,
                date: post.postDate,
              }}
            />
          );
        })}
    </div>
  );
};

export default AllPosts;
