import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { format } from "date-fns";
import { useQuery } from "../hooks/useQuery";
import { listPosts } from "../lib/BlogService";
import ErrorAlert from "../components/ErrorAlert";
import Loader from "../components/Loader";
import styles from "../styles/Home.module.css";

const Home = () => {
  const { data: posts, error, isLoading } = useQuery({ queryFn: listPosts });

  if (isLoading) return <Loader isRouteLoader={true} />;

  if (error) return <ErrorAlert error={error} isRouteError={true} />;

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.heading}>Posts</h1>
      </div>
      <div className={styles.container}>
        {posts.map((post) => (
          <article className={styles.post} key={post.id}>
            <div>
              <Link to={`/posts/${post.id}`}>
                <h2 className={styles.postTitle}>{post.title}</h2>
              </Link>
            </div>
            <div className={styles.metadata}>
              <div>{format(post.createdAt, "MMM d, y")}</div>
              <div className={styles.iconData}>
                <MessageCircle size={16} /> {post._count.comments}
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
};

export default Home;
