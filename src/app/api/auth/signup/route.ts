import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import clientPromise from "@/app/api/lib/mongodb";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Please provide email and password" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection("chatUsers");

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { email, password: hashedPassword };

    const result = await usersCollection.insertOne(newUser);
    if (result.acknowledged) {
      const token = jwt.sign({ email: newUser.email }, JWT_SECRET, { expiresIn: "1h" });
      return NextResponse.json({ token }, { status: 201 });
    } else {
      return NextResponse.json({ message: "Failed to create user" }, { status: 500 });
    }
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
