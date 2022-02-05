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
      return getAppDetails(req, res)
    }
  }

  // Getting all posts.
  async function getAppDetails(req, res) {
    try {
      let db = await connectDb()
      let data = await db.collection("metadata").findOne({})
      console.log(data)

      return res.status(200).json({
        message: data,
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
