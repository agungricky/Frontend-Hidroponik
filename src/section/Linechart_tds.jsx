import React, { useState, useEffect, useRef } from "react";
import Chart from "react-apexcharts";
import { db } from "../Firebase";
import { onValue, ref } from "firebase/database";
import api from "../Restapi";

const INTERVAL = 60000; // kirim data ke backend tiap 60 detik

const Linechart_tds = () => {
  const [series, setSeries] = useState([
    {
      name: "TDS",
      data: [], // nanti diisi dari database
    },
  ]);

  const phRef = useRef(null);
  const tdsRef = useRef(null);
  const suhuRef = useRef(null);
  const recordRef = useRef([]); // menyimpan semua data yang tampil di chart

  const [ph, setPh] = useState(null);
  const [tds, setTds] = useState(null);
  const [suhu, setSuhu] = useState(null);

  // --- STEP 1: Ambil data awal dari database ---
  useEffect(() => {
    api
      .get("/sensor")
      .then((response) => {
        // console.log("Response /sensor:", response.data);

        // antisipasi jika Laravel resource: { data: [...] }
        const sensorData = Array.isArray(response.data)
          ? response.data
          : response.data.data || [];

        // ubah format data sesuai chart Apex (x = waktu, y = nilai PH)
        const formattedData = sensorData.map((item) => ({
          x: new Date(item.created_at),
          y: parseFloat(item.tds),
        }));

        // simpan ke ref dan chart
        recordRef.current = formattedData;
        setSeries([{ name: "TDS", data: formattedData }]);
      })
      .catch((error) => {
        console.error("Error fetching initial data:", error);
      });
  }, []);

  // --- STEP 2: Sinkronisasi data dari Firebase ---
  useEffect(() => {
    const phDb = ref(db, "ph");
    const tdsDb = ref(db, "tds");
    const suhuDb = ref(db, "suhu");

    const unsubPh = onValue(phDb, (snap) => setPh(snap.val()));
    const unsubTds = onValue(tdsDb, (snap) => setTds(snap.val()));
    const unsubSuhu = onValue(suhuDb, (snap) => setSuhu(snap.val()));

    return () => {
      unsubPh();
      unsubTds();
      unsubSuhu();
    };
  }, []);

  // --- STEP 3: Setiap 60 detik, kirim data baru ke backend dan update chart ---
  useEffect(() => {
    const interval = setInterval(() => {
      if (
        phRef.current !== null &&
        tdsRef.current !== null &&
        suhuRef.current !== null
      ) {
        const dataToSend = {
          ph: phRef.current,
          tds: tdsRef.current,
          suhu: suhuRef.current,
          time: new Date().toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          }),
        };

        // kirim ke backend
        api
          .post("/sensor", dataToSend)
          .then(() => {
            // tambahkan data baru ke recordRef
            const newData = [
              ...recordRef.current,
              { x: new Date(), y: parseFloat(dataToSend.tds) },
            ].slice(-15); // jaga tetap 15 data terakhir

            recordRef.current = newData;
            setSeries([{ name: "TDS", data: newData }]);
          })
          .catch((err) =>
            console.error("Error posting sensor:", err.response?.data || err)
          );
      }
    }, INTERVAL);

    return () => clearInterval(interval);
  }, []);

  // --- STEP 4: Update ref setiap nilai Firebase berubah ---
  useEffect(() => {
    phRef.current = ph;
    tdsRef.current = tds;
    suhuRef.current = suhu;
  }, [ph, tds, suhu]);

  // --- STEP 5: Konfigurasi chart ---
  const options = {
    chart: {
      id: "realtime",
      type: "line",
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: { speed: 500 },
      },
      zoom: { enabled: false },
    },
    stroke: { curve: "smooth" },
    markers: { size: 4, colors: "#FF5733" },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false,
        format: "HH:mm:ss",
        rotate: -45,
      },
    },
    yaxis: {
      min: 0,
      max: 100,
      title: { text: "Nilai TDS" },
    },
    title: {
      text: "Realtime TDS Chart",
      align: "left",
    },
  };

  // --- STEP 6: Render chart ---
  return (
    <div className="col-12 col-md-6 col-lg-6">
      <div className="card" style={{ borderTop: "4px solid #E0D9D9" }}>
        <div className="card-block">
          <h3 className="card-title">Realtime TDS Chart</h3>
          <h6 className="card-subtitle">
            Data dari database (15 terbaru) dan update otomatis tiap menit.
          </h6>

          <div className="mt-3">
            {series[0].data.length > 0 ? (
              <Chart
                options={options}
                series={series}
                type="line"
                height={300}
                width={450}
              />
            ) : (
              <p>Belum ada data tunggu 1 menit...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Linechart_tds;
