export default function Separator() {
    return (
    <div className="my-8 h-1 w-full"
    style={{
        backgroundImage:
          "radial-gradient(circle, hsl(var(--border)) 2px, transparent 2px)",
        backgroundSize: "12px 4px",
        backgroundRepeat: "repeat-x",
        backgroundPosition: "center",
      }}>
              <h1 className="font-serif">Hello</h1>
    </div>
    )
  }