import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type BlogPostContentProps = {
  content: string;
};

export default function BlogPostContent({ content }: BlogPostContentProps) {
  return (
    <div className="blog-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ alt, ...props }) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img {...props} alt={alt ?? ""} loading="lazy" decoding="async" />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
