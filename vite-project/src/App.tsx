import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const POST = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" }
];

function App() {
  console.log("post", POST);

  const queryClient = useQueryClient();
  const postQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(() => [...POST])
  });

  const newPostMutation = useMutation({
    mutationFn: (title: string) => {
      return wait(1000).then(() =>
        POST.push({ id: crypto.randomUUID(), title })
      );
    },
    onSuccess: async () => {
      try {
        await queryClient.invalidateQueries(["posts"]);
      } catch (error) {
        console.log(error);
      }
    }
  });

  if (postQuery.isLoading) return <p>Loading...</p>;
  if (postQuery.isError) return <p>Error</p>;
  return (
    <div>
      {postQuery.data?.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
      <button
        disabled={newPostMutation.isLoading}
        onClick={() => newPostMutation.mutate("New Post")}
      >
        Add Post
      </button>
    </div>
  );
}
function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default App;
