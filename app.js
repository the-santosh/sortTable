class TableSort {
    constructor(dataSet, tableId) {
        this.dataSet = dataSet;
        this.tableId = tableId;
    }
    renderTable() {
        this.renderThead(this.dataSet[0]);
        this.renderTbody(this.dataSet);
    }
    renderThead(data) {
        //render thead
        let thead = `<tr>`;
        for (let key in data) {
            thead += `<th data-order="">${key}</th>`;
        }
        thead += `</tr >`;
        document.querySelector(`#${this.tableId} thead`).innerHTML = thead;
        document.querySelector(`#${this.tableId} thead tr`).addEventListener('click', this.sortData.bind(this));
    }

    renderTbody(dataSet) {
        //render tbody
        let tbody = '';
        dataSet.forEach(user => {
            tbody += `<tr>`;
            for (let key in user) {
                tbody += `<td>${user[key]}</td>`;
            }
            tbody += `</tr >`;
        });
        document.querySelector(`#${this.tableId} tbody`).innerHTML = tbody;
    }

    sortData(event) {
        if (event.target.tagName == "TH") {
            if (!event.target.dataset.order || event.target.dataset.order == 'desc') {
                event.target.dataset.order = 'asc';
            }
            else if (event.target.dataset.order == 'asc') {
                event.target.dataset.order = 'desc';
            }
            let sortColumn = event.target.innerText;
            this.dataSet.sort((a, b) => {
                if (event.target.dataset.order == 'asc') {
                    if (a[sortColumn] > b[sortColumn]) return -1;
                    if (a[sortColumn] < b[sortColumn]) return 1;
                }
                if (event.target.dataset.order == 'desc') {
                    if (a[sortColumn] > b[sortColumn]) return 1;
                    if (a[sortColumn] < b[sortColumn]) return -1;
                }
                return 0;
            });
            this.renderTbody(this.dataSet);
        }
    }
};

((() => {
    let oReq = new XMLHttpRequest();
    oReq.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let tableSort = new TableSort(JSON.parse(oReq.responseText), 'userData');
            tableSort.renderTable();

        }
    };
    oReq.open('GET', "http://jsonplaceholder.typicode.com/posts", true);
    oReq.send();
})());
