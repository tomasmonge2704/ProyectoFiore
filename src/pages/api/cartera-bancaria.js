export default function handler(req, res) {
    res.status(200).json([
        {
          nombre: "DPL Trading LLC",
          empresa:"DPL",
          direccion: "30 North Gould Street, Suit R",
          direccion2: "Sheridan, WY 82801, USA",
          vatNumber: "92-0566625",
          banks:[{
            beneficiaryBank:"INTERNATIONAL FINANCE BANK",
            bankAdress:"777 SW 37th AVE. SUITE 100",
            swiftCode:"MIAMI, FL 33135, USA",
            beneficiaryName:"IFBKUS3M",
            beneficiaryAccountNumber:"1200073959",
            correspondentBank:"Wells Fargo bANK - New York, USA",
            ABA:"026005092",
            swift:"PNBPUS3NNYC"
          },{
            beneficiaryBank:"INTERNATIONAL FINANCE BANK 2",
            bankAdress:"777 SW 37th AVE. SUITE 100",
            swiftCode:"MIAMI, FL 33135, USA",
            beneficiaryName:"IFBKUS3M",
            beneficiaryAccountNumber:"1200073959"
          }]
        },
        {
          nombre: "Duplo",
          empresa:"Duplo",
          direccion: "40 North Gould Street, Suit R",
          direccion2: "Sheridan, WY 8000, USA",
          vatNumber: "90-000000",
          banks:[{
            beneficiaryBank:"INTERNATIONAL FINANCE BANK 3",
            bankAdress:"777 SW 37th AVE. SUITE 100",
            swiftCode:"MIAMI, FL 33135, USA",
            beneficiaryName:"IFBKUS3M",
            beneficiaryAccountNumber:"1200073959"
          },{
            beneficiaryBank:"INTERNATIONAL FINANCE BANK 4",
            bankAdress:"777 SW 37th AVE. SUITE 100",
            swiftCode:"MIAMI, FL 33135, USA",
            beneficiaryName:"IFBKUS3M",
            beneficiaryAccountNumber:"1200073959"
          }]
        }
      ])
}