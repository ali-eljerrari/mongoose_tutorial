import User from "../models/user.schema";

export const create_data = () => {
  const newUser = new User({
    name: "Alice",
    age: 28,
    email: "alice@example.com",
  });

  newUser.save();
};

export const read_data = async () => {
  const data = await User.find({});

  console.log(data);
};

export const update_data = () => {
  User.updateOne(
    { email: "alice@example.com" },
    { age: 29 },
    (err: any, res: any) => {
      if (err) return console.error(err);
      console.log("User updated:", res);
    }
  );
};

export const delete_data = () => {
  User.deleteOne({ email: "alice@example.com" }, (err: any) => {
    if (err) return console.error(err);
    console.log("User deleted");
  });
};
