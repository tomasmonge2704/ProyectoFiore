export default function handler(req, res) {
    res.status(200).json([
        {name:"100% TT - Against copy of original docs",id:"1"},
        {name:"100% in advance",id:"2"},
        {name:"20% in advance / 80% TT - Against copy of original docs",id:"3"},
        {name:"30% in advance / 70% TT - Against copy of original docs",id:"4"},
        {name:"40% in advance / 60% TT - Against copy of original docs",id:"5"},
        {name:"50% in advance / 50% TT - Against copy of original docs",id:"6"}
      ])
  }