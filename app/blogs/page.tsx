import BlogIcon from "@/components/custom-svgs/blog-icon";

export default function Blogs() {

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <span className="flex items-center gap-2">
          <BlogIcon />
          <h1 className="text-2xl font-medium sm:text-3xl font-serif">My Writings</h1>
        </span>
        
        <p className="mt-3 text-muted-foreground">Explore my thoughts and tech talks on various topics.</p>
      </main>
      <div className="flex items-center gap-2"> 
        <button className="transition-colors hover:text-muted-foreground">Design/Engineering</button>
        <button className="transition-colors hover:text-muted-foreground">Personal</button>
      </div>
    </div>

    
  );
}
