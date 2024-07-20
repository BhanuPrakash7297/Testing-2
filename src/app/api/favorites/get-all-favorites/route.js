import connectToDB from "@/src/database";
import Favorites from "@/src/models/Favorites";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const accountId = searchParams.get("accountId");

    const getAllFavorites = await Favorites.find({ uid: id, accountId });

    if (getAllFavorites) {
      return NextResponse.json({
        success: true,
        data: getAllFavorites,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something Went wrong",
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      message: "Something Went wrong 2",
    });
  }
}