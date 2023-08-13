export default function handler(req, res) {
    res.status(200).json([
        {
          title:"60/40",
          items: [
            {
              porcentaje: 40,
              descripcion: "IN ADVANCE",
            },
            {
              porcentaje: 60,
              descripcion: "TT AGAINST COPY OF ORIGINAL DOCS BY EMAIL ",
            },
          ],
        },
        {
          title:"70/30",
          items: [
            {
              porcentaje: 70,
              descripcion: "IN ADVANCE",
            },
            {
              porcentaje: 30,
              descripcion: "TT AGAINST COPY OF ORIGINAL DOCS BY EMAIL ",
            },
          ],
        }
      ])
  }