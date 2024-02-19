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

        const createRow = (...content) => {
            return `
                  <tr>
                    <td>${content[0]}</td>
                    <td>${content[1]}</td>
                    <td>${content[2] || '-'}</td>
                    <td>${content[3] || '-'}</td>
                  </tr>
                `;
        };

        tpl += '<tbody>';
        tpl += this.data.map(obj => {
            if (obj.constructor.name === 'Departamento') {
                return createRow(obj.id, obj.nombre);
            }
            if (obj.constructor.name === 'Provincia') {
                return createRow(obj.id, obj.nombre, obj.departamento.id, obj.departamento.nombre);
            }
            if (obj.constructor.name === 'Distrito') {
                return createRow(obj.id, obj.nombre, obj.provincia.id, obj.provincia.nombre);
            }
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
