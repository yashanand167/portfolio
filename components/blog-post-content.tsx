import { Children, isValidElement, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import BlogChart, { isBlogChartId } from "@/components/blog-charts";

type BlogPostContentProps = {
  content: string;
};

function getCodeText(children: ReactNode): string {
  return Children.toArray(children)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") {
        return String(child);
      }
      if (isValidElement<{ children?: ReactNode }>(child)) {
        return getCodeText(child.props.children);
      }
      return "";
    })
    .join("")
    .trim();
}

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
          pre: ({ children }) => {
            const codeChild = Children.toArray(children).find((child) =>
              isValidElement<{ className?: string; children?: ReactNode }>(
                child,
              ),
            );

            if (
              isValidElement<{ className?: string; children?: ReactNode }>(
                codeChild,
              ) &&
              typeof codeChild.props.className === "string" &&
              codeChild.props.className.includes("language-react-chart")
            ) {
              const chartId = getCodeText(codeChild.props.children);
              if (isBlogChartId(chartId)) {
                return <BlogChart id={chartId} />;
              }
            }

            return <pre>{children}</pre>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
