// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientPromise from "../../lib/mongodb"

async function connectDb() {
  let db = await (await clientPromise).db("movieApp")
  return db
}

export default async function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case "POST": {
      return addFavorite(req, res)
    }
    case "DELETE": {
      return removeFavorite(req, res)
    }
  }

  // Add a favorite
  async function addFavorite(req, res) {
    try {
      let movieId = parseInt(req.query.movieId)
      console.log(movieId)

      let db = await connectDb()
      await db
        .collection("users")
        .updateOne(
          { email: "souzapereira.renan@gmail.com" },
          { $addToSet: { favorites: movieId } }
        )
      return res.json({
        message: "Favorite added successfully",
        success: true,
      })
    } catch (error) {
      return res.json({
        message: new Error(error).message,
        success: false,
      })
    }
  }

  // Remove a favorite
  async function removeFavorite(req, res) {
    try {
      let movieId = parseInt(req.query.movieId)

      let db = await connectDb()
      await db
        .collection("users")
        .updateOne(
          { email: "souzapereira.renan@gmail.com" },
          { $pull: { favorites: movieId } }
        )

      return res.json({
        message: "Favorite removed successfully",
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
