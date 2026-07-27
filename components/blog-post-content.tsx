import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type BlogPostContentProps = {
  content: string;
};

export default function BlogPostContent({ content }: BlogPostContentProps) {
  return (
    <div className="blog-content">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
