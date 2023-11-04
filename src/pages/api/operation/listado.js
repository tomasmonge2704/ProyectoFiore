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
  try{
    await connectMongoDb();
    const objetos = await OperationModel.find({});
    const listado = getListado(objetos).sort((a, b) => b.refNumber - a.refNumber);
    res.status(200).json(listado);
  }catch (err){
    res.status(500).json({message:err})
  }
}