"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import DataTableDemo from "../components/shared/Table";
import SheetDemo from "@/components/shared/Sheet";
import { DialogDemo } from "@/components/shared/Dialog";

const users = [
  { _id: "1", name: "Ali Smith", email: "ali1@gmail.com", age: 27 },
  { _id: "2", name: "Sara Johnson", email: "sara2@gmail.com", age: 25 },
  { _id: "3", name: "John Williams", email: "john3@gmail.com", age: 30 },
  { _id: "4", name: "Jane Brown", email: "jane4@gmail.com", age: 28 },
  { _id: "5", name: "Mike Davis", email: "mike5@gmail.com", age: 32 },
  { _id: "6", name: "Anna Miller", email: "anna6@gmail.com", age: 24 },
  { _id: "7", name: "Chris Wilson", email: "chris7@gmail.com", age: 29 },
  { _id: "8", name: "Kate Moore", email: "kate8@gmail.com", age: 26 },
  { _id: "9", name: "Tom Taylor", email: "tom9@gmail.com", age: 31 },
  { _id: "10", name: "Laura Anderson", email: "laura10@gmail.com", age: 23 },
  { _id: "11", name: "David Thomas", email: "david11@gmail.com", age: 35 },
  { _id: "12", name: "Emma Jackson", email: "emma12@gmail.com", age: 22 },
  { _id: "13", name: "James White", email: "james13@gmail.com", age: 34 },
  { _id: "14", name: "Sophia Harris", email: "sophia14@gmail.com", age: 21 },
  { _id: "15", name: "Robert Martin", email: "robert15@gmail.com", age: 33 },
  { _id: "16", name: "Olivia Thompson", email: "olivia16@gmail.com", age: 27 },
  { _id: "17", name: "William Garcia", email: "william17@gmail.com", age: 25 },
  {
    _id: "18",
    name: "Isabella Martinez",
    email: "isabella18@gmail.com",
    age: 30,
  },
  {
    _id: "19",
    name: "Michael Rodriguez",
    email: "michael19@gmail.com",
    age: 28,
  },
  { _id: "20", name: "Emily Martinez", email: "emily20@gmail.com", age: 32 },
  { _id: "21", name: "Daniel Gonzalez", email: "daniel21@gmail.com", age: 24 },
  { _id: "22", name: "Ava Perez", email: "ava22@gmail.com", age: 29 },
  { _id: "23", name: "Matthew Taylor", email: "matthew23@gmail.com", age: 26 },
  { _id: "24", name: "Charlotte Lee", email: "charlotte24@gmail.com", age: 31 },
  { _id: "25", name: "Joshua Lopez", email: "joshua25@gmail.com", age: 23 },
  { _id: "26", name: "Amelia Gonzalez", email: "amelia26@gmail.com", age: 35 },
  { _id: "27", name: "Ethan Harris", email: "ethan27@gmail.com", age: 22 },
  { _id: "28", name: "Mia Clark", email: "mia28@gmail.com", age: 34 },
  {
    _id: "29",
    name: "Alexander Lewis",
    email: "alexander29@gmail.com",
    age: 21,
  },
  { _id: "30", name: "Harper Robinson", email: "harper30@gmail.com", age: 33 },
  {
    _id: "31",
    name: "Benjamin Walker",
    email: "benjamin31@gmail.com",
    age: 27,
  },
  { _id: "32", name: "Ella Hall", email: "ella32@gmail.com", age: 25 },
  {
    _id: "33",
    name: "Sebastian Young",
    email: "sebastian33@gmail.com",
    age: 30,
  },
  { _id: "34", name: "Avery Hernandez", email: "avery34@gmail.com", age: 28 },
  { _id: "35", name: "Jack King", email: "jack35@gmail.com", age: 32 },
  {
    _id: "36",
    name: "Scarlett Wright",
    email: "scarlett36@gmail.com",
    age: 24,
  },
  { _id: "37", name: "Henry Scott", email: "henry37@gmail.com", age: 29 },
  { _id: "38", name: "Grace Green", email: "grace38@gmail.com", age: 26 },
  { _id: "39", name: "Lucas Adams", email: "lucas39@gmail.com", age: 31 },
  { _id: "40", name: "Victoria Baker", email: "victoria40@gmail.com", age: 23 },
  { _id: "41", name: "Mason Nelson", email: "mason41@gmail.com", age: 35 },
  { _id: "42", name: "Lily Carter", email: "lily42@gmail.com", age: 22 },
  { _id: "43", name: "Logan Mitchell", email: "logan43@gmail.com", age: 34 },
  { _id: "44", name: "Zoe Perez", email: "zoe44@gmail.com", age: 21 },
  { _id: "45", name: "Lucas Roberts", email: "lucas45@gmail.com", age: 33 },
  { _id: "46", name: "Sophie Turner", email: "sophie46@gmail.com", age: 27 },
  { _id: "47", name: "Jack Phillips", email: "jack47@gmail.com", age: 25 },
  { _id: "48", name: "Chloe Campbell", email: "chloe48@gmail.com", age: 30 },
  { _id: "49", name: "Oliver Parker", email: "oliver49@gmail.com", age: 28 },
  { _id: "50", name: "Liam Evans", email: "liam50@gmail.com", age: 32 },
];

const Home = () => {
  const [data, setData] = useState<
    [{ _id: string; email: string; name: string; age: number }] | null
  >(null);
  const [error, setError] = useState<any>(null);

  const [openSheet, setOpenSheet] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);

  const [selectedRecord, setSelectedRecord] = useState<string>("");

  const fetchData = async () => {
    try {
      const res = await axios.get("/api/users/read");

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
      {error && <div>{JSON.stringify(error.message)}</div>}
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

      {error && (
        <DataTableDemo
          data={users}
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
