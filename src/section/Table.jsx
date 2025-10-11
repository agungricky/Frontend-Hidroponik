import DataTable from "react-data-table-component";
function table() {
    const data = [
        { title: "The Shawshank Redemption", director: "Frank Darabont", year: 1994 },
        { title: "The Godfather", director: "Francis Ford Coppola", year: 1972 },
        { title: "Pulp Fiction", director: "Quentin Tarantino", year: 1994 },
    ];

    const columns = [
        { name: "#", selector: (row, index) => index + 1, sortable: true, width: '60px' },
        { name: "Title", selector: row => row.title, sortable: true },
        { name: "Director", selector: row => row.director, sortable: true },
        { name: "Year", selector: row => row.year, sortable: true },
    ];


    return (
        <DataTable
            // title="History Log"
            columns={columns}
            data={data}
            pagination
            highlightOnHover
            selectableRows
        />
    )
}

export default table
