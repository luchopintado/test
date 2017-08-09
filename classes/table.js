class Table {

    constructor(headers, data) {
        this.headers = headers;
        this.data = data;
    }

    buildTHead() {
        let tpl = '';

        tpl += '<thead>';
        tpl += '    <tr>';
        tpl += this.headers.map(h => `<th>${h}</th>`).join('');
        tpl += '    </tr>';
        tpl += '</thead>';

        return tpl;
    }

    buildTBody() {
        let tpl = '';

        tpl += '<tbody>';
        tpl += this.data.map(obj => {
            if (obj.constructor.name === 'Departamento') {
                return `
                  <tr>
                    <td>${obj.id}</td>
                    <td>${obj.nombre}</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                `;
            }
            if (obj.constructor.name === 'Provincia') {
                return `
                  <tr>
                    <td>${obj.id}</td>
                    <td>${obj.nombre}</td>
                    <td>${obj.departamento.id}</td>
                    <td>${obj.departamento.nombre}</td>
                  </tr>
                `;
            }
            if (obj.constructor.name === 'Distrito') {
                return `
                  <tr>
                    <td>${obj.id}</td>
                    <td>${obj.nombre}</td>
                    <td>${obj.provincia.id}</td>
                    <td>${obj.provincia.nombre}</td>
                  </tr>
                `;
            }
            tpl += '</tr>';
        }).join('');
        tpl += '</tbody>';

        return tpl;
    }

    buildTable() {
        return `
            <table>
                ${this.buildTHead()}
                ${this.buildTBody()}
            </table>
        `;
    }
}