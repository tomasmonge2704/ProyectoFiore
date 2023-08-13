export default function handler(req, res) {
    res.status(200).json([
        {port:"Destination port 1",
        country:"Buenos aires"
      },
      {port:"Destination port 2",
        country:"uruguay"
      },
      {port:"Destination port 3",
        country:"china"
      },
      ])
  }