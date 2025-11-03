import { useParams } from "react-router-dom";
import { useQuery } from "../hooks/useQuery";
import { getPost } from "../lib/BlogService";
import PostForm from "../components/PostForm";
import Loader from "../components/Loader";
import ErrorAlert from "../components/ErrorAlert";
import styles from "../styles/PostForm.module.css";

const PostFormLayout = () => {
  const { id } = useParams();

  const {
    data: post,
    error,
    isLoading,
  } = useQuery({ queryFn: () => getPost(id), enabled: !!id });

  if (isLoading) return <Loader isRouteLoader={true} />;

  if (error) return <ErrorAlert error={error} isRouteError={true} />;

  return (
    <>
      <h1 className={styles.heading}>{!id ? "Create Post" : "Edit Post"}</h1>

      <PostForm postData={post} />
    </>
  );
};
export default PostFormLayout;
