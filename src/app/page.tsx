"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import DataTableDemo from "../components/shared/Table";
import SheetDemo from "@/components/shared/Sheet";
import { DialogDemo } from "@/components/shared/Dialog";

const Home = () => {
  const [data, setData] = useState<
    [{ _id: string; email: string; name: string; age: number }] | null
  >(null);
  const [error, setError] = useState(null);

  const [openSheet, setOpenSheet] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);

  const [selectedRecord, setSelectedRecord] = useState<string>("");

  const fetchData = async () => {
    try {
      const res = await axios.get("/api/users/read");

      // console.log(res.data);
      setData(res.data);
    } catch (error: any) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="min-h-screen w-full max-w-[60rem] mx-auto my-auto py-12">
      {error && <div>{JSON.stringify(error)}</div>}
      {data && (
        <DataTableDemo
          data={data}
          openSheet={openSheet}
          setOpenSheet={setOpenSheet}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          selectedRecord={selectedRecord}
          setSelectedRecord={setSelectedRecord}
        />
      )}
      <SheetDemo
        openSheet={openSheet}
        setOpenSheet={setOpenSheet}
        item={data?.filter((item) => item._id === selectedRecord)[0]}
      />

      <DialogDemo openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </main>
  );
};

export default Home;
