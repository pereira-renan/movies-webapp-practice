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
    case "POST": {
      return updateFavorites(req, res)
    }
  }

  // Getting all posts.
  async function getFavorites(req, res) {
    let userEmail = req.headers.email
    try {
      let db = await connectDb()
      let data = await db.collection("users").findOne({ email: userEmail })
      let userFavorites = data.favorites

      return res.status(200).json({
        userFavorites,
        success: true,
      })
    } catch (error) {
      return res.json({
        message: new Error(error).message,
        success: false,
      })
    }
  }

  async function updateFavorites(req, res) {
    try {
      let db = await connectDb()
      let body = JSON.parse(req.body)

      await db
        .collection("users")
        .updateOne(
          { email: body.email },
          { $set: { favorites: body.favorites } }
        )

      return res.status(200).json({
        success: true,
        body,
      })
    } catch (error) {
      return res.json({
        message: new Error(error).message,
        success: false,
      })
    }
  }
}
