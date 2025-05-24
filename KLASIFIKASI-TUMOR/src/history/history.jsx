import React, { useEffect, useState } from 'react';
import { Table, Card } from 'react-bootstrap';
import { FaHistory } from 'react-icons/fa';

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const userId = localStorage.getItem("user_id");

      if (!userId) {
        console.error("User ID tidak ditemukan di localStorage");
        return;
      }

      try {
        const res = await fetch(`http://localhost/klasifikasi_tumor-app/database/get_history.php?user_id=${userId}`);
        const data = await res.json();
        setHistory(data);
      } catch (err) {
        console.error('Gagal mengambil data:', err);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="p-4">
      <h2 className="mb-4">
        <FaHistory className="me-2" />
        Riwayat Deteksi Tumor
      </h2>
      <Card className="shadow-sm">
        <Card.Body>
          {history.length === 0 ? (
            <p className="text-muted text-center mb-0">Belum ada riwayat deteksi ditemukan.</p>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Gambar</th>
                  <th>Hasil</th>
                  <th>Confidence</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.date}</td>
                    <td>
                      <img
                        src={item.image}
                        alt="MRI"
                        width="100"
                        className="img-thumbnail rounded shadow-sm"
                      />
                    </td>
                    <td>
                      <span className={`badge ${item.result === 'notumor' ? 'bg-success' : 'bg-danger'}`}>
                        {item.result || '-'}
                      </span>
                    </td>
                    <td>{item.confidence ? `${parseFloat(item.confidence).toFixed(2)}%` : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
