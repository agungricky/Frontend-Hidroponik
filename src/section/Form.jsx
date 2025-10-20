import React, { useState, useEffect } from 'react';
import { ref, onValue, update } from 'firebase/database';
import { db } from '../Firebase';
import Swal from 'sweetalert2'

function Form() {
    const [formData, setFormData] = useState({
        autoPh: '',
        autoTds: '',
        autoSuhu: '',
    });

    const [savedData, setSavedData] = useState({
        autoPh: 0,
        autoTds: 0,
        autoSuhu: 0,
    });

    // ambil data dari Firebase realtime
    useEffect(() => {
        const dataRef = ref(db, '/');
        const unsubscribe = onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            if (data) setSavedData(data);
        });
        return () => unsubscribe();
    }, []);

    // hanya izinkan angka
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (/^\d*$/.test(value)) {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataToSend = Object.fromEntries(
                Object.entries(formData).map(([key, val]) => [key, Number(val) || 0])
            );
            await update(ref(db, '/'), dataToSend);
            Swal.fire({
                title: "Data berhasil disimpan!",
                icon: "success",
                draggable: false
            });
            setFormData({ autoPh: '', autoTds: '', autoSuhu: '' });
        } catch (error) {
            console.error('Gagal mengirim data:', error);
            alert('Terjadi kesalahan saat mengirim data.');
        }
    };

    return (
        <div className="container mt-4">
            <form className="form-material" onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col-md-4 mb-3">
                        <label className="form-label" style={{ textAlign: 'left' }}>Sensor Ph</label>
                        <input
                            type="text"
                            name="autoPh"
                            placeholder="contoh: 7"
                            className="form-control text-center"
                            value={formData.autoPh}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-4 mb-3">
                        <label className="form-label">Sensor TDS</label>
                        <input
                            type="text"
                            name="autoTds"
                            placeholder="contoh: 1300"
                            className="form-control text-center"
                            value={formData.autoTds}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-4 mb-3">
                        <label className="form-label">Sensor Suhu</label>
                        <input
                            type="text"
                            name="autoSuhu"
                            placeholder="contoh: 25"
                            className="form-control text-center"
                            value={formData.autoSuhu}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <button type="submit" className="btn btn-success w-100">
                            Update Setting
                        </button>
                    </div>
                </div>
            </form>

            <div className="table-responsive mt-5">
                <h4 className="mb-3 fw-normal text-secondary" style={{ fontSize: '1.1rem' }}>
                    Setting tersimpan saat ini :
                </h4>
                <table className="table table-bordered text-center align-middle shadow-sm">
                    <thead className="table-light">
                        <tr>
                            <th className="text-center">Ph</th>
                            <th className="text-center">TDS</th>
                            <th className="text-center">Suhu</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="fw-bold fs-5">{savedData.autoPh}</td>
                            <td className="fw-bold fs-5">{savedData.autoTds}</td>
                            <td className="fw-bold fs-5">{savedData.autoSuhu}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Form;
