import Sidebar from "@/components/Sidebar";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UserButton } from "@clerk/nextjs";
import MessageArrayProvider from "@/context/MessageArrayContext";

const Layout = ({ children }) => {
  return (
    <>
      <div className="fixed right-5 top-5">
        <UserButton afterSignOutUrl="/" />
      </div>
      <div className="fixed left-0 top-0 h-full w-80 max-md:hidden">
        <Sidebar />
      </div>
      <div className="fixed md:hidden">
        <Sheet className="bg-gray-900">
          <SheetTrigger>
            <div className="m-5">
              <MenuIcon />
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
