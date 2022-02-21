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
      return getMoviesAndUpdateDatabase(req, res)
    }
  }

  // Getting all posts.
  async function getMoviesAndUpdateDatabase(req, res) {
    try {
      let maxPages = 5
      var movies = {}
      var catalog = []
      var moviesByPage = []
      let catalogMoviesCount = 0
      for (let pageNumber = 1; pageNumber <= maxPages; pageNumber++) {
        let data = await fetch(
          `https://api.themoviedb.org/3/movie/popular?page=${pageNumber}&api_key=8353351ab4cc562ce1cfced2e08dfd66`,
          {
            method: "GET",
          }
        )

        let response = await data.json()
        moviesByPage = response.results
        catalog.push(...response.results)
      }
      movies["catalog"] = catalog
      movies["moviesCount"] = catalog.length

      let dateNow = new Date().toLocaleString()
      movies["lastUpdated"] = dateNow

      let db = await connectDb()
      await db.collection("movies").deleteMany({})
      await db.collection("movies").insertOne(movies)

      res.status(200).json({
        message: `Updated. Collection erased and ${catalog.length} movies added.`,
      })

      //      return res.status(200).json({
      //        message: JSON.parse(JSON.stringify(posts)),
      //        success: true,
      //      })
    } catch (error) {
      return res.json({
        message: new Error(error).message,
        success: false,
      })
    }
  }
}
