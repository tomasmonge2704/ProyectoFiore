function obtenerFechaActual() {
    const hoy = new Date();
    const dia = hoy.getDate().toString().padStart(2, "0");
    const mes = (hoy.getMonth() + 1).toString().padStart(2, "0"); // Los meses comienzan en 0 (enero=0, febrero=1, etc.)
    const anio = hoy.getFullYear();
  
    return `${anio}-${mes}-${dia}`;
  }
let operationObjet = {
    comercial: {
      title: "Comercial",
      completed: 0,
      fields: {
        empresaRefNumber: "",
        empleadoBuyer: "",
        empleadoSeller: "",
        date: obtenerFechaActual(),
        empresa: {
          nombre: "",
          empresa: "",
          direccion: "",
          direccion2: "",
          vatNumber: "",
          bank: {
            beneficiaryBank: "",
            bankAdress: "",
            swiftCode: "",
            beneficiaryName: "",
            beneficiaryAccountNumber: "",
            correspondentBank:""
          },
        },
        seller: {
          nombre: "",
          direccion: "",
          direccion2: "",
          pais: "",
          country:"",
          taxId: "",
          refNumber: "",
          plantNumber:"",
          brand:""
        },
        buyer: {
          nombre: "",
          direccion: "",
          direccion2: "",
          vatNumber: "",
          refNumber: "",
        },
        productos: [
          {
            id: "",
            description: "",
            packing: "",
            quantity:1,
            quantityCartons:0,
            netWeight:0,
            netWeightLogistica:0,
            grossWeight:0,
            unitPricePurchase: "",
            unitPriceSale: "",
            amountSale: "",
            amountPurchase: "",
          },
        ],
        totalPurchase: 0,
        totalSale: 0,
        totalQuantityCartons:0,
        totalNetWeight: 0,
        totalGrossWeight: 0,
        operationType: "",
        comisionMarketing:0,
        comisionPurchase:0,
        comisionSale:0,
        productionDate: "",
        shelfLife: "",
        destinationPort: "",
        destinationCountry: "",
        deliveryTermsSale: "",
        deliveryTermsPurchase: "",
        paymentTermsSale: "",
        paymentTermsPurchase: "",
        comentarios:""
      },
    },
    docs: {
      title: "Docs",
      completed: 0,
      fields: {
        date: obtenerFechaActual(),
        responsable:"",
        documentRequested: [],
        instruccionsToIssue: "",
        tipoContenedor: "",
        descriptionGoods: "",
        descriptionGoods2: "",
        temperature: "- 18 °C ",
        placeBLIssue: "",
        comentarios: "",
        comentariosSeller: "",
        terminosFlete: "PREPAID ABROAD",
        consignee: {
          nombre: "",
          direccion: "",
          direccion2: "",
          direccion3: "",
          country: "",
          taxId: "",
        },
        notify: {
          nombre: "",
          direccion: "",
          direccion2: "",
          direccion3: "",
          country: "",
          taxId: "",
        },
        consigneeRest: {
          nombre: "",
          direccion: "",
          direccion2: "",
          direccion3: "",
          country: "",
          taxId: "",
        },
      },
    },
    logistica: {
      title: "Logistica",
      completed: 0,
      fields: {
        ShippingLine: "",
        freightForwarder: "",
        bookingNr: "",
        voyageNr: "",
        insuranceAmount:0,
        freightAmount:0,
        eta:"",
        etd:"",
        vesselName:"",
        containerNr:"",
        blNr:"",
        seals:"",
        grossWeight:0,
        netWeight:0,
        quantityCartons:0
      },
    },
    contableFinanciera: {
      title: "Contable financiera",
      completed: 0,
      fields: {},
    },
    status: "New",
  };

export default operationObjet;