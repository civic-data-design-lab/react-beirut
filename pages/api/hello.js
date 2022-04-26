import dbConnect from "../../lib/dbConnect";

export default async (req, res) => {
  await dbConnect()

  res.status(200).json({ name: 'John Doe' })
};
