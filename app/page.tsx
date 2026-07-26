import Header from "@/components/header";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center font-sans text-black">
      <main className="flex w-full max-w-4xl flex-col items-center justify-between py-16 px-4 text-black sm:items-start ">
        <div className="flex justify-center">
          <Header />
        </div>
        <div className="mt-5">
          <Image src="" alt=""/>
          <h1>Hi, I am Yash Anand</h1>
          <p>
            A design-focused software engineer building rich and sleek web
            applications <br />
            with modern technologies and minimalistic design.
          </p>
          <p>
            I build modern applications using 
            <span></span>
          </p>
        </div>
      </main>
    </div>
  );
}