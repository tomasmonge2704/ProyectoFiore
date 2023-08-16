export default function handler(req, res) {
    res.status(200).json([
        {port:"Destination port 1",
        country:"Buenos aires",
        id:"1"
      },
      {port:"Destination port 2",
        country:"uruguay",
        id:"2"
      },
      {port:"Destination port 3",
        country:"china",
        id:"3"
      },
      ])
  }