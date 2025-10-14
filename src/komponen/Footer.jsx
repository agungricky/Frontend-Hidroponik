import api from "../Restapi";
import Swal from 'sweetalert2'

function Footer() {
    const handleReset = async (e) => {
        e.preventDefault(); // biar gak reload halaman

        try {
            await api.post("/reset", { reset: true });
            Swal.fire({
                title: "Data Berhasil di Reset!",
                icon: "success",
                draggable: false
            });
        } catch (error) {
            console.error("Gagal reset data:", error);
            alert("Terjadi kesalahan saat reset data.");
        }
    };

    return (
        <footer className="footer pl-4 py-2 text-sm text-gray-600">
            © 2025 <span className="font-semibold text-green-700">AHC</span> (Automatic Hydroponic Control) |{" "}
            <a
                href="#"
                onClick={handleReset}
                className="text-green-600 hover:text-green-800 underline"
            >
                Reset Data
            </a>
        </footer>
    );
}

export default Footer;
