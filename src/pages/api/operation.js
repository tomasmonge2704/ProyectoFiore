export default function handler(req, res) {
    res.status(200).json(opertaion)
  }
function obtenerFechaActual() {
    const hoy = new Date();
    const dia = hoy.getDate().toString().padStart(2, '0');
    const mes = (hoy.getMonth() + 1).toString().padStart(2, '0'); // Los meses comienzan en 0 (enero=0, febrero=1, etc.)
    const anio = hoy.getFullYear();
  
    return `${anio}-${mes}-${dia}`;
}
const opertaion = {
    comercial: {
      title: "Comercial",
      completed: 0,
      fields:{
        orderNumber: "",
        supplierRefNumber: "",
        date: obtenerFechaActual(),
        empresa: {
          nombre: "",
          empresa:"",
          direccion: "",
          direccion2: "",
          vatNumber: "",
          bank:{
            beneficiaryBank:"",
            bankAdress:"",
            swiftCode:"",
            beneficiaryName:"",
            beneficiaryAccountNumber:""
          }
        },
        seller:{
          nombre: "",
          direccion: "",
          direccion2: "",
          pais: "",
          cuit: "",
          refNumber:""
        },
        buyer:{
          direccion: "",
          direccion2: "",
          vatNumber: "",
          refNumber:""
        }
        ,
        productos: [
          {
            id: "",
            description: "",
            packing: null,
            quantity: null,
            unitPricePurchase: null,
            unitPriceSale: null,
            amountSale: null,
            amountPurchase:null
          },
        ],
        totalPurchase:0,
        totalSale:0,
        totalWeight:0,
        productionDate: "",
        shelfLife: "",
        destinationPort: "",
        destinationCountry: "",
        quantity: "",
        shipmentPeriod: "",
        deliveryTermsSale: "",
        deliveryTermsPurchase: "",
        paymentTermsSale: "",
        paymentTermsPurchase: "",
        exportTo: ""
      }
    },
    docs: { title: "Docs", completed: 0 },
    logistica: { title: "Logistica", completed: 0 },
    contableFinanciera: { title: "Contable financiera", completed: 0 },
    status:"New"
  }