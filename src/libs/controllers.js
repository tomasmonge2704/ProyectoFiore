class Controllers {
    constructor(ObjetoModel) {
      this.Objeto = ObjetoModel;
    }
    async create(req, res) {
        try {
          for (const key in req.body) {
            if (typeof req.body[key] === 'string' && req.body[key].trim() === '' ) {
              throw new Error(`El parámetro ${key} está vacío`);
            }
          }
          const nuevoObjeto = await this.Objeto.create(req.body);
          res.status(201).json(nuevoObjeto);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }
    
      // Método para obtener todos los objetos
    async getAll(req, res) {
        try {
          const objetos = await this.Objeto.find({});
          res.json(objetos);
        } catch (error) {
        console.log(error)
          res.status(500).json({ error: 'Error al obtener los objetos' });
        }
      }
    
      // Método para obtener un objeto por su ID
    async getById(req, res) {
        try {
          const objeto = await this.Objeto.findById(req.query.id);
          if (!objeto) {
            return res.status(404).json({ error: 'Objeto no encontrado' });
          }
          res.json(objeto);
        } catch (error) {
          res.status(500).json({ error: error });
        }
      }
    
      // Método para actualizar un objeto por su ID
    async updateById(req, res) {
        try {
          const objetoActualizado = await this.Objeto.findByIdAndUpdate(req.query.id, req.body, { new: true });
          res.json(objetoActualizado);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }
    
      // Método para eliminar un objeto por su ID
    async deleteById(req, res) {
        try {
          const objetoEliminado = await this.Objeto.findByIdAndDelete(req.query.id);
          if (!objetoEliminado) {
            return res.status(404).json({ error: 'Objeto no encontrado' });
          }
          res.json({ message: 'Objeto eliminado correctamente' });
        } catch (error) {
          res.status(500).json({ error: 'Error al eliminar el objeto' });
        }
      }
  }

export default Controllers;