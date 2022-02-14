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
      return listMovieCatalog(req, res)
    }
  }

  // Getting all posts.
  async function listMovieCatalog(req, res) {
    try {
      let db = await connectDb()
      let data = await db.collection("movies").findOne({})
      let movies = data.catalog

      return res.status(200).json({
        movies,
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
