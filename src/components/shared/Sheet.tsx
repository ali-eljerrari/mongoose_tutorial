import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";

const SheetDemo = ({ openSheet, setOpenSheet, item }: any) => {
  const [input, setInput] = useState({ name: "", email: "", age: 0 });

  useEffect(() => {
    setInput({ ...item });

    return () => {
      console.log("cleaning up...");
      setInput({ name: "", email: "", age: 0 });
    };
  }, [item, openSheet]);

  const handleOnSubmit = (e: any) => {
    //! check if the is no modification, compare item to input
    // console.log(e);
  };

  return (
    <Sheet open={openSheet} onOpenChange={() => setOpenSheet(!openSheet)}>
      <SheetTrigger asChild>
        <Button variant="outline" className="hidden">
          Open
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={input.name}
              onChange={(e) => setInput({ ...input, name: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              className="col-span-3"
              value={input.email}
              onChange={(e) => setInput({ ...input, email: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="age" className="text-right">
              Age
            </Label>
            <Input
              type="number"
              id="age"
              className="col-span-3"
              value={input.age}
              onChange={(e) =>
                setInput({ ...input, age: parseInt(e.target.value) })
              }
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Discard</Button>
          </SheetClose>
          <Button type="submit" onClick={() => handleOnSubmit(input)}>
            Save changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SheetDemo;
