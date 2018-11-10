
describe('Testing Table column sort functionality', () => {
    let tableSort,
        mockData = [{
            "userId": 1,
            "id": 2,
            "title": "qui est esse",
            "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
        },
        {
            "userId": 2,
            "id": 3,
            "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
            "body": "det iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
        }];

    beforeAll(function () {
        const table = document.createElement('table');
        table.id = "userData";

        const tbody = document.createElement('tbody');
        const thead = document.createElement('thead');
        table.appendChild(thead);
        table.appendChild(tbody);
        document.body.appendChild(table);
        tableSort = new TableSort(mockData, 'userData');
    });

    afterAll(function () {
        document.querySelector('#userData').remove();
    });

    it('Data should be rendered in table: 2 records/rows', () => {
        tableSort.renderTable();
        expect(document.querySelectorAll('#userData tbody tr').length).toEqual(2);
        expect(document.querySelectorAll('#userData tbody tr td')[2].innerText).toEqual('qui est esse');
    });

    it('Sort column "id" in asc order', () => {
        //mock sorted data by "id" in asc order for comparison
        let sortedById = [{ "userId": 2, "id": 3, "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut", "body": "det iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut" }, { "userId": 1, "id": 2, "title": "qui est esse", "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla" }];
        tableSort.renderTable();
        let event = {
            target: {
                tagName: "TH",
                innerText: "id",
                dataset: {
                    order: "desc"
                }
            }
        };
        tableSort.sortData(event);
        console.log(JSON.stringify(tableSort.dataSet));
        expect(tableSort.dataSet).toEqual(sortedById);

    });
    it('Sort column "id" in desc order ', () => {
        //mock desc sorted data by "id" in desc for comparison
        let sortedById = [{ "userId": 1, "id": 2, "title": "qui est esse", "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla" }, { "userId": 2, "id": 3, "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut", "body": "det iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut" }];
        tableSort.renderTable();
        let event = {
            target: {
                tagName: "TH",
                innerText: "id",
                dataset: {
                    order: "asc"
                }
            }
        };
        tableSort.sortData(event);
        expect(tableSort.dataSet).toEqual(sortedById);
    });
})
