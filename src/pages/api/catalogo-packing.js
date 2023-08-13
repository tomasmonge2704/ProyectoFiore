export default function handler(req, res) {
  res
    .status(200)
    .json([
      "10 kgs - bulk",
      "10 kgs - layer pack",
      "15 kgs - bulk",
      "20 x 1 kg - 20 kgs cartons",
      "2 x 10 kgs - 20 kgs cartons",
    ]);
}
