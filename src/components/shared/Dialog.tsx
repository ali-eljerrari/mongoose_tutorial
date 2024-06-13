import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useEffect, useState } from "react";

export function DialogDemo({
  openDialog,
  setOpenDialog,
}: {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
}) {
  const [input, setInput] = useState({ name: "", email: "", age: 18 });

  const handleOnSubmit = async (user: any) => {
    //! validate input

    try {
      if (!user.name || !user.email) {
        return;
      }

      await axios.post("/api/users/create", { user });

      // setOpenDialog(false);

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      // console.log("cleaning up...");
      setInput({ name: "", email: "", age: 18 });
    };
  }, [openDialog]);

  return (
    <Dialog open={openDialog} onOpenChange={() => setOpenDialog(!openDialog)}>
      <DialogTrigger asChild>
        <Button variant="outline" className="hidden">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
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
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
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
        <DialogFooter>
          <Button type="submit" onClick={() => handleOnSubmit(input)}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
