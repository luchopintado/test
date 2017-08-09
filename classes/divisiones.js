class Departamento {
    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre;
    }
}

class Provincia {
    constructor(id, nombre, departamento) {
        this.id = id;
        this.nombre = nombre;
        this.departamento = departamento;
    }
}

class Distrito {
    constructor(id, nombre, provincia) {
        this.id = id;
        this.nombre = nombre;
        this.provincia = provincia;
    }
}