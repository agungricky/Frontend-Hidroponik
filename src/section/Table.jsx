import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import api from "../Restapi";

function Table() {
    const [fulldata, setFulldata] = useState([]);
    const [ , setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    // ambil data dari backend
    const fetchData = async () => {
        try {
            const response = await api.get("/alldata");
            setFulldata(response.data); // langsung ambil array karena backend return json array
        } catch (err) {
            console.error("Gagal mengambil data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(); // ambil data pertama kali

        // auto-refresh setiap 60 detik
        const interval = setInterval(() => {
            fetchData();
        }, 60000);

        // bersihkan interval saat komponen unmount
        return () => clearInterval(interval);
    }, []);

    const columns = [
        {
            name: "#",
            selector: (row, index) => (currentPage - 1) * perPage + index + 1,
            width: "70px",
        },
        { name: "Ph", selector: (row) => row.ph, sortable: true },
        { name: "Tds", selector: (row) => row.tds, sortable: true },
        { name: "Suhu", selector: (row) => row.suhu, sortable: true },
        { name: "Time", selector: (row) => row.time, sortable: true },
        {
            name: "Tanggal",
            selector: (row) => {
                const date = new Date(row.created_at);
                return date.toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                });
            },
            sortable: true,
        },
    ];

    const handleDownload = async () => {
        try {
            const response = await api.get("/downloadExcell", {
                responseType: "blob", // penting biar hasil download bukan teks acak
            });

            // Buat link sementara untuk download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "data-sensor.xlsx");
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Gagal download Excel:", error);
        }
    };

    return (
        <div className="px-2 m-0">
            <div className="mb-3 d-flex align-items-center">
                <div className="d-inline d-sm-block">
                    <span className="text-muted mr-3 mb-3">Klik tombol untuk mengunduh data Excel</span>

                    <button onClick={handleDownload} className="btn btn-success me-2">
                        <i className="bi bi-file-earmark-excel me-1"></i> Download Excel
                    </button>
                </div>
            </div>

            {/* <DataTable
                // title="Download Excell"
                columns={columns}
                data={fulldata}
                progressPending={loading}
                pagination
                highlightOnHover
                striped
                dense
                noDataComponent="Tidak ada data untuk ditampilkan"
            /> */}

            <DataTable
                columns={columns}
                data={fulldata}
                pagination
                paginationPerPage={perPage}
                onChangePage={(page) => setCurrentPage(page)}
                onChangeRowsPerPage={(newPerPage, page) => {
                    setPerPage(newPerPage);
                    setCurrentPage(page);
                }}
            />

        </div>
    );
}

export default Table;
