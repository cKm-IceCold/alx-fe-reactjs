import React from 'react';
// Note: keepPreviousData is now placeholderData in TanStack Query v4/v5
import { useQuery } from '@tanstack/react-query'; 

// --- 1. Define the Data Fetching Function ---
const fetchPosts = async () => {
  // Simulate network latency for a better demo
  await new Promise(resolve => setTimeout(resolve, 500)); 
  const response = await fetch('https://jsonplaceholder.typicode.com/posts'); 
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

function PostsComponent() {
  
  // --- 2. Use the useQuery hook with advanced options ---
  const {
    data,           
    isLoading,      
    isError,        
    error,          
    refetch,        
    isFetching,
    isPreviousData, // Replaces isFetching when using placeholderData
  } = useQuery({
    queryKey: ['posts'], 
    queryFn: fetchPosts,
    
    // --- Advanced Caching and Behavior Settings ---
    
    // Time before data is garbage collected from the cache (5 minutes)
    cacheTime: 1000 * 60 * 5, 
    
    // How long data is considered fresh before a background refetch is triggered (5 seconds)
    staleTime: 1000 * 5, 
    
    // Prevents automatic refetch when the window gains focus (set to false for controlled behavior)
    refetchOnWindowFocus: false, 
    
    // Keeps previous data rendered while fetching new data (the modern replacement for keepPreviousData)
    placeholderData: (previousData) => previousData,
  });

  // --- 3. Handle Loading State ---
  if (isLoading) {
    return <h2>Loading posts...</h2>;
  }

  // --- 4. Handle Error State ---
  if (isError) {
    return <h2 style={{ color: 'red' }}>Error fetching data: {error.message}</h2>;
  }

  // --- 5. Render Data and Controls ---
  return (
    <div>
      <h2 style={{ display: 'flex', alignItems: 'center' }}>
        Posts List 
        {/* Check for a background refetch */}
        {isFetching && <span style={{ marginLeft: '10px', fontSize: '14px', color: 'gray' }}>Updating...</span>}
      </h2>
      
      <button 
        onClick={() => refetch()} 
        disabled={isFetching}
        style={{ 
          marginBottom: '15px', 
          padding: '8px', 
          marginRight: '10px' 
        }}
      >
        {isFetching ? 'Refetching...' : 'Manual Refetch'}
      </button>

      {/* Demonstrating the effect of placeholderData */}
      {isFetching && isPreviousData && 
        <span style={{ color: 'blue' }}>
          Displaying old data while fetching new data...
        </span>
      }

      <hr />

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {data.slice(0, 10).map(post => (
          <li key={post.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', borderRadius: '4px' }}>
            <strong>{post.id}. {post.title}</strong>
            <p>{post.body.substring(0, 70)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostsComponent;