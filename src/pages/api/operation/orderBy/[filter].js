import OperationModel from "@/models/operation";
import connectMongoDb from "@/libs/mongodb";

function calcularDiasHastaFecha(fecha) {
    if(!fecha) return "No tiene fecha ETA";
    const fechaObjetivo = new Date(fecha);
    const fechaActual = new Date();
    const diferenciaEnMilisegundos = fechaObjetivo - fechaActual;
    const diasRestantes = Math.ceil(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));
    if(diasRestantes < 0) return "Ya arrivo"
    if (diasRestantes <= 30) {
      return `${diasRestantes} días`;
    } else {
      // Calcula los meses restantes (aproximadamente)
      const mesesRestantes = Math.floor(diasRestantes / 30);
      return `${mesesRestantes} meses`;
    }
  }
  function getListado(objetos) {
    return objetos.map((elemento) => ({
      status: elemento.status,
      refNumber: elemento.id,
      empleado: elemento.comercial.fields.empleadoBuyer,
      shipper: elemento.comercial.fields.seller.nombre,
      buyer: elemento.comercial.fields.buyer.nombre,
      empresa: elemento.comercial.fields.empresa.empresa,
      timeToArrival:calcularDiasHastaFecha(elemento.logistica.fields.eta)
    }));
  }
export default async function handler(req, res) {
  await connectMongoDb();

  try{
    const { filter } = req.query;
    let objetos = await OperationModel.find().sort({ timestamp: -1 });
    const listado = getListado(objetos);
    if (filter === "refNumber") {
      objetos = listado.sort((a, b) => b.refNumber - a.refNumber);
    } else if (filter === "shipper") {
      objetos = listado.sort((a, b) => a.shipper.localeCompare(b.shipper));
    } else if (filter === "buyer") {
      objetos = listado.sort((a, b) => a.buyer.localeCompare(b.buyer));
    } else if (filter === "status") {
      objetos = listado.sort((a, b) => a.status.localeCompare(b.status));
    } else if (filter === "date") {
      objetos = listado.sort((a, b) => b.timestamp - a.timestamp);
    } else if (filter === "timeToArrival") {
      objetos = listado.sort((a, b) => b.timestamp - a.timestamp);
    }
    res.status(200).json(objetos);
  }catch (err){
    res.status(500).json({message:err})
  }
}