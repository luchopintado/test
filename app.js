class App {

    constructor(data, headers){
        this.headers = headers;
        this.data = data;
        this.sqlScripts = [];
    }

    init() {
        let lines = this.data.split('\n');

        lines.forEach(line => {
            if (line) {
                const regex = /(\d+)/g;
                let [, , , codDep, dep, codProv, prov, codDist, dist] = line.split(regex);

                if (dep && prov && dist) {
                    const u1 = codDep;
                    const u2 = codProv.substr(-2);
                    const u3 = codDist.substr(-2);

                    this.sqlScripts.push(this.buildSQLScript(u1, u2, u3, dep, prov, dist));
                }
            }
        });

        this.renderSQLScript();
    }

    renderSQLScript() {
        document.querySelector('#sql').innerHTML = this.sqlScripts.join('\n');
    }

    buildSQLScript(u1, u2, u3, dep, prov, dist) {
        return `INSERT INTO GEOGRAPHIC_LOCATION(UBIGEO, DEPARTMENT_CODE, PROVINCE_CODE, DISTRICT_CODE, DEPARTMENT_NAME, PROVINCE_NAME,DISTRICT_NAME) VALUES ('${u1}${u2}${u3}', '${u1}', '${u2}', '${u3}', '${dep.trim()}', '${prov.trim()}', '${dist.trim()}');`;
    }
}

const fetchHeaders = new Headers();
fetchHeaders.append("Content-Type", "text/plain");
var fetchParams = {
    method: 'GET',
    mode: 'cors',
	redirect: 'follow',
    headers: fetchHeaders,
    cache: 'default'
}
var myRequest = new Request('./locations.txt', fetchParams);
fetch(myRequest)
    .then(response => {
        return response.text();
    })
    .then(text => {
        const headers = ['Correlativo', 'CodDep', 'Departamento', 'CodProv', 'Provincia', 'CodDist', 'Distrito'];
        const app = new App(text, headers);
        app.init();
    });

console.log('Finish app :D');