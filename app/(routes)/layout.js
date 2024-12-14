import Sidebar from "@/components/Sidebar";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UserButton } from "@clerk/nextjs";
import MessageArrayProvider from "@/context/MessageArrayContext";
import Link from "next/link";
import Image from "next/image";

const Layout = ({ children }) => {
  return (
    <>
      <div className="z-20 fixed top-0 w-full bg-[#1f1f1e] border-b border-[rgba(255,255,255,0.16)] h-16 flex items-center justify-between px-3">
        <div>
          <Link href="/" className="flex items-center gap-5">
            <Image
              height={65}
              width={65}
              src="/logo.png"
              className=" py-5 pl-5 max-md:hidden"
            />
            <h2 className="text-white text-2xl font-bauhaus max-md:pl-10">Fusion AI</h2>
          </Link>
        </div>
        <div className="">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
      <div className="fixed left-0 top-16 h-full w-80 max-md:hidden">
        <Sidebar />
      </div>
      <div className="fixed left-0 z-20 md:hidden">
        <Sheet className="bg-gray-900">
          <SheetTrigger>
            <div className="mt-5 ml-2">
              <MenuIcon color="white" />
            </div>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 border-none text-white">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>
      <div className="md:ml-80 h-full max-md:pt-20">
        <MessageArrayProvider>{children}</MessageArrayProvider>
      </div>
    </>
  );
};

export default Layout;
