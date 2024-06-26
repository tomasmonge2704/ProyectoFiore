import OperationModel from "@/models/operation";
import authMiddleware from "@/libs/auth";

async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const operation = await OperationModel.findOne({ id: req.query.refNumber });
      if (!operation) {
        return res.status(404).json({ error: "Objeto no encontrado" });
      }
      const processedOperation = processOperation(operation);
      return res.json(processedOperation);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "PUT") {
    try {
      const objetoActualizado = await OperationModel.findOneAndUpdate(
        { id: req.query.refNumber }, // El campo para buscar el documento
        req.body, // Los datos con los que actualizar el documento
        { new: true } // Opciones para devolver el documento actualizado
      );
      return res.json(objetoActualizado);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: "Método no permitido" });
}

function processOperation(op) {
  const operation = JSON.parse(JSON.stringify(op));
  const productos = operation?.comercial?.fields?.productos;

  if (productos) {
    let balanceSale = 0;
    let balancePurchase = 0;
    let totalNetWeight = 0;
    let totalNetWeightLogistica = 0;
    let totalLogistica = 0;
    let totalGrossWeight = 0;
    let totalQuantityCartons = 0;
    let totalBroker = 0;
    let totalMarketing = 0;
    let totalBrokerLogistica = 0;
    let totalMarketingLogistica = 0;

    for (let i = 0; i < productos.length; i++) {
      balanceSale += productos[i].unitPriceSale * productos[i].netWeight;
      balancePurchase += productos[i].unitPricePurchase * productos[i].netWeight;
      totalNetWeight += Number(productos[i].netWeight);
      totalNetWeightLogistica += Number(productos[i].netWeightLogistica);
      totalLogistica += productos[i].netWeightLogistica * productos[i].unitPriceSale;
      totalGrossWeight += Number(productos[i].grossWeight);
      totalQuantityCartons += Number(productos[i].quantityCartons);
      totalBroker += productos[i].netWeight * (productos[i].comisionPurchase ? productos[i].comisionPurchase : operation.comercial.fields.comisionPurchase);
      totalMarketing += productos[i].netWeight * (productos[i].comisionMarketing ? productos[i].comisionMarketing : operation.comercial.fields.comisionMarketing);
      totalBrokerLogistica += productos[i].netWeightLogistica * (productos[i].comisionPurchase ? productos[i].comisionPurchase : operation.comercial.fields.comisionPurchase);
      totalMarketingLogistica += productos[i].netWeightLogistica * (productos[i].comisionMarketing ? productos[i].comisionMarketing : operation.comercial.fields.comisionMarketing);
    }

    return {
      ...operation,
      comercial: {
        ...operation.comercial,
        fields: {
          ...operation.comercial.fields,
          totalPurchase: balancePurchase,
          totalSale: balanceSale,
          totalNetWeight: totalNetWeight,
          totalBroker: totalBroker,
          totalMarketing: totalMarketing,
        },
      },
      logistica: {
        ...operation.logistica,
        fields: {
          ...operation.logistica.fields,
          totalNetWeightLogistica: totalNetWeightLogistica,
          totalLogistica: totalLogistica,
          totalQuantityCartons: totalQuantityCartons,
          totalGrossWeight: totalGrossWeight,
          totalBroker: totalBrokerLogistica,
          totalMarketing: totalMarketingLogistica,
        },
      },
    };
  }

  console.log(operation);
  return operation;
}

export default authMiddleware(handler);
