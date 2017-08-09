class App {

    constructor(data, headers){
        this.headers = headers;
        this.data = data;
        this.departamentos = [];
        this.provincias = [];
        this.distritos = [];
    }

    init() {
        let lineas = this.data.split('\n');

        lineas.forEach(linea => {
            if (linea) {
                let nuevaLinea = linea.replace(/[“”]+/g, '').trim();
                let [dep, prov, dist] = nuevaLinea.split('/').map(obj => obj.trim());

                if (dep && !prov && !dist) {
                    this.departamentos.push(this.createDepartamento(dep));
                }

                if (dep && prov && !dist) {
                    this.provincias.push(this.createProvincia(dep, prov));
                }

                if (dep && prov && dist) {
                    this.distritos.push(this.createDistrito(dep, prov, dist));
                }
            }
        });

        this.buildDepTable();
        this.buildProvTable();
        this.buildDistTable();
    }

    createDepartamento (dep) {
        let [id, ...nombre] = dep.trim().split(' ');
        return new Departamento(id, nombre.join(' '));
    }

    createProvincia(dep, prov) {
        let [id, ...nombre] = prov.trim().split(' ');
        let departamento = this.createDepartamento(dep);
        return new Provincia(id, nombre.join(' '), departamento);
    }

    createDistrito(dep, prov, dist) {
        let [id, ...nombre] = dist.trim().split(' ');
        let provincia = this.createProvincia(dep, prov);
        return new Distrito(id, nombre.join(' '), provincia);
    }

    buildDepTable(){
        const table = new Table(this.headers, this.departamentos);
        document.querySelector('.div-departamentos').innerHTML = table.buildTable();
    }

    buildProvTable(){
        const table = new Table(this.headers, this.provincias);
        document.querySelector('.div-provincias').innerHTML = table.buildTable();
    }

    buildDistTable(){
        const table = new Table(this.headers, this.distritos);
        document.querySelector('.div-distritos').innerHTML = table.buildTable();
    }

}

const plainData = `
    “01 Lima /  / ”
    “01 Lima / 50 Lima / ”
    “01 Lima / 51 Barranca / ”
    “01 Lima / 50 Lima / 202 La Molina”
    “01 Lima / 50 Lima / 203 San Isidro”
    “02 Arequipa /  / ”
    “02 Arequipa / 63 Arequipa / ”
    “02 Arequipa / 64 Caylloma / ”
    “02 Arequipa / 63 Arequipa / 267 Cercado”
`;
const headers = ['Código', 'Nombre', 'Código Padre', 'Descripción Padre']
const app = new App(plainData, headers);
app.init();


console.log('Finish app :D');