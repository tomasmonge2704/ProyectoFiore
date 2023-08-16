export default function handler(req, res) {
  res
    .status(200)
    .json([
      {name:"10 kgs - bulk",id:"1"},
      {name:"10 kgs - layer pack",id:"2"},
      {name:"15 kgs - bulk",id:"3"},
      {name:"20 x 1 kg - 20 kgs cartons",id:"4"},
      {name:"2 x 10 kgs - 20 kgs cartons",id:"5"},
    ]);
}
