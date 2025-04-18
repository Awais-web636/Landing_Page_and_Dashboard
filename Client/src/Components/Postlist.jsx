import { useBlog } from "@/components/blog-context"
import { formatDate } from "@/lib/utils"
import { Pencil, Trash2, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function PostsList({ type, onEdit }) {
  const { getPublishedPosts, getDraftPosts, deletePost, updatePost } = useBlog()
  const { toast } = useToast()

  const posts = type === "published" ? getPublishedPosts() : getDraftPosts()

  const handleDelete = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePost(postId)
      toast({
        title: "Post deleted",
        description: "The post has been permanently deleted",
      })
    }
  }

  const handleTogglePublish = (postId, currentStatus) => {
    updatePost(postId, { isPublished: !currentStatus })
    toast({
      title: currentStatus ? "Post unpublished" : "Post published",
      description: currentStatus ? "The post has been moved to drafts" : "The post is now visible on the blog",
    })
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          {type === "published"
            ? "No published posts yet. Publish a draft to see it here."
            : "No drafts available. Create a new post to get started."}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div key={post.id} className="border rounded-md p-4">
          <div className="mb-2">
            <h2 className="text-lg font-bold">{post.title}</h2>
            <p className="text-sm text-gray-500">{formatDate(post.createdAt)}</p>
          </div>
          <div className="line-clamp-3 text-gray-600">
            <p>{post.excerpt}</p>
          </div>
          <div className="flex justify-between mt-4">
            <div className="flex space-x-2">
              <button
                className="flex items-center border border-gray-300 rounded px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => onEdit(post.id)}
              >
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </button>
              <button
                className="flex items-center border border-red-500 text-red-500 rounded px-2 py-1 text-sm hover:bg-red-100"
                onClick={() => handleDelete(post.id)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </button>
            </div>
            <button
              className={`flex items-center rounded px-2 py-1 text-sm ${
                post.isPublished ? "border border-gray-300 text-gray-700 hover:bg-gray-100" : "bg-blue-500 text-white"
              }`}
              onClick={() => handleTogglePublish(post.id, post.isPublished)}
            >
              <Eye className="h-4 w-4 mr-2" />
              {post.isPublished ? "Unpublish" : "Publish"}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}