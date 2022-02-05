// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientPromise from "../../lib/mongodb"

async function connectDb() {
  let db = await (await clientPromise).db("movieApp")
  return db
}

export default async function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case "GET": {
      return getFavorites(req, res)
    }
  }

  // Getting all posts.
  async function getFavorites(req, res) {
    try {
      let db = await connectDb()
      let data = await db
        .collection("users")
        .findOne({ email: "souzapereira.renan@gmail.com" })

      return res.status(200).json({
        message: data.favorites,
        success: true,
      })
    } catch (error) {
      return res.json({
        message: new Error(error).message,
        success: false,
      })
    }
  }
}
