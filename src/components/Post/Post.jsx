const Post = ({ post }) => {
  return (
    <div>
      <div>
        <div>
          <img src={post.owner.photoURL} />
        </div>
        <div>{post.owner.displayName}</div>
      </div>

      <div>
        <video controls src={post.link} />
        <div>{post.didascalia}</div>
      </div>

      <div>{post.like}</div>
      <div>{post.dataPostato.toDate().toLocaleDateString()}</div>
    </div>
  );
};

export default Post;
