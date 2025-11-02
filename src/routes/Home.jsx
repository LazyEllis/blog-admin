import { useState } from "react";
import { useQuery } from "../hooks/useQuery";
import { listPosts } from "../lib/BlogService";
import ErrorAlert from "../components/ErrorAlert";
import Post from "../components/Post";
import Loader from "../components/Loader";
import styles from "../styles/Home.module.css";

const Home = () => {
  const [selectedId, setSelectedId] = useState(null);

  const {
    data: posts,
    error,
    isLoading,
    setData: setPosts,
  } = useQuery({ queryFn: listPosts });

  const handlePostDelete = (deletedComment) => {
    setPosts(posts.filter((post) => post.id !== deletedComment.id));
    setSelectedId(null);
  };

  const handleCancel = () => setSelectedId(null);

  if (isLoading) return <Loader isRouteLoader={true} />;

  if (error) return <ErrorAlert error={error} isRouteError={true} />;

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.heading}>Posts</h1>
      </div>
      <div className={styles.container}>
        {posts.map((post) => (
          <Post
            post={post}
            isSelected={selectedId === post.id}
            onSelect={() => setSelectedId(post.id)}
            onDelete={handlePostDelete}
            onCancel={handleCancel}
            key={post.id}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
