const express = require("express")
const { Pool } = require("pg")
const bodyParser = require("body-parser")
const cors = require("cors")

// Configuración de la aplicación
const app = express()
const port = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

// Configuración de la conexión a la base de datos
const pool = new Pool({
  user: "vetadmin",
  host: "172.31.7.10", 
  database: "vettrack",
  password: "123", 
  port: 5432,
})

// Capa de datos (Data Access Layer)
const petDAO = {
  // Crear una nueva mascota
  createPet: async (name, ownerName) => {
    const query = "INSERT INTO pets (name, owner_name) VALUES ($1, $2) RETURNING *"
    const values = [name, ownerName]
    const result = await pool.query(query, values)
    return result.rows[0]
  },

  // Obtener todas las mascotas
  getAllPets: async () => {
    const query = "SELECT * FROM pets ORDER BY id ASC"
    const result = await pool.query(query)
    return result.rows
  },
}

// Capa de negocio (Business Logic Layer)
const petService = {
  // Registrar una nueva mascota
  registerPet: async (name, ownerName) => {
    // Validaciones
    if (!name || !ownerName) {
      throw new Error("El nombre de la mascota y del dueño son obligatorios")
    }

    // Lógica de negocio
    return await petDAO.createPet(name, ownerName)
  },

  // Listar todas las mascotas
  listAllPets: async () => {
    return await petDAO.getAllPets()
  },
}

// Capa de presentación (API REST)
// Ruta para registrar una mascota
app.post("/api/pets", async (req, res) => {
  try {
    const { name, ownerName } = req.body
    const pet = await petService.registerPet(name, ownerName)
    res.status(201).json(pet)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Ruta para obtener todas las mascotas
app.get("/api/pets", async (req, res) => {
  try {
    const pets = await petService.listAllPets()
    res.json(pets)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Página principal HTML simple
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html")
})

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`)
})

// Inicializar la base de datos
async function initDB() {
  try {
    // Crear la tabla si no existe
    await pool.query(`
      CREATE TABLE IF NOT EXISTS pets (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        owner_name VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log("Base de datos inicializada correctamente")
  } catch (error) {
    console.error("Error al inicializar la base de datos:", error)
  }
}

initDB()
