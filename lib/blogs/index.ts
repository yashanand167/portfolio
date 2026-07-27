import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import { calculateReadingTime } from "./reading-time";
import {
  BLOG_CATEGORIES,
  type BlogCategory,
  type BlogPost,
  type BlogPostMeta,
} from "./types";

const CONTENT_DIRECTORY = path.join(process.cwd(), "content");

function normalizeDate(value: unknown): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }

  if (typeof value === "string" && value.trim()) {
    return value.trim();
  }

  return "";
}

function isBlogCategory(value: unknown): value is BlogCategory {
  return (
    typeof value === "string" &&
    BLOG_CATEGORIES.includes(value as BlogCategory)
  );
}

function normalizeTags(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(
    (tag): tag is string => typeof tag === "string" && tag.trim() !== "",
  );
}

function getCategoryDirectory(category: BlogCategory): string {
  return path.join(CONTENT_DIRECTORY, category);
}

function parseBlogFile(category: BlogCategory, filename: string): BlogPost {
  const slug = filename.replace(/\.md$/, "");
  const filePath = path.join(getCategoryDirectory(category), filename);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const trimmedContent = content.trim();

  if (typeof data.title !== "string" || !data.title.trim()) {
    throw new Error(`Blog "${category}/${slug}" is missing a title.`);
  }

  if (typeof data.description !== "string" || !data.description.trim()) {
    throw new Error(`Blog "${category}/${slug}" is missing a description.`);
  }

  if (!isBlogCategory(data.category)) {
    throw new Error(
      `Blog "${category}/${slug}" has an invalid category. Use "design-engineering" or "personal".`,
    );
  }

  if (data.category !== category) {
    throw new Error(
      `Blog "${category}/${slug}" category "${data.category}" does not match folder "${category}".`,
    );
  }

  if (!normalizeDate(data.date)) {
    throw new Error(`Blog "${category}/${slug}" is missing a date.`);
  }

  if (typeof data.published !== "boolean") {
    throw new Error(
      `Blog "${category}/${slug}" must set published to true or false.`,
    );
  }

  return {
    slug,
    title: data.title.trim(),
    description: data.description.trim(),
    date: normalizeDate(data.date),
    category: data.category,
    tags: normalizeTags(data.tags),
    published: data.published,
    readingTime: calculateReadingTime(trimmedContent),
    cover:
      typeof data.cover === "string" && data.cover.trim()
        ? data.cover.trim()
        : undefined,
    content: trimmedContent,
  };
}

function getBlogFilenames(category: BlogCategory): string[] {
  const categoryDirectory = getCategoryDirectory(category);

  if (!fs.existsSync(categoryDirectory)) {
    return [];
  }

  return fs
    .readdirSync(categoryDirectory)
    .filter((filename) => filename.endsWith(".md"))
    .sort();
}

function getAllBlogPosts(includeUnpublished = false): BlogPost[] {
  const posts = BLOG_CATEGORIES.flatMap((category) =>
    getBlogFilenames(category).map((filename) =>
      parseBlogFile(category, filename),
    ),
  );

  const filteredPosts = includeUnpublished
    ? posts
    : posts.filter((post) => post.published);

  return filteredPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getAllBlogs(includeUnpublished = false): BlogPostMeta[] {
  return getAllBlogPosts(includeUnpublished).map(
    ({ content: _content, ...meta }) => meta,
  );
}

export function getBlogBySlug(
  category: BlogCategory,
  slug: string,
  includeUnpublished = false,
): BlogPost | null {
  const filename = `${slug}.md`;

  if (!getBlogFilenames(category).includes(filename)) {
    return null;
  }

  const post = parseBlogFile(category, filename);

  if (!includeUnpublished && !post.published) {
    return null;
  }

  return post;
}

export function getBlogsByCategory(
  category: BlogCategory,
  includeUnpublished = false,
): BlogPostMeta[] {
  return getAllBlogs(includeUnpublished).filter(
    (blog) => blog.category === category,
  );
}

export function getAllBlogParams(includeUnpublished = false): Array<{
  category: BlogCategory;
  slug: string;
}> {
  return getAllBlogs(includeUnpublished).map((blog) => ({
    category: blog.category,
    slug: blog.slug,
  }));
}