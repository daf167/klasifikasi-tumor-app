import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

export default function Statistics() {
  const [stats, setStats] = useState({ glioma: 0, meningioma: 0, notumor: 0, pituitary: 0 });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.id) {
      fetch(`http://localhost/klasifikasi_tumor-app/database/get_stats.php?user_id=${user.id}`)
        .then((res) => res.json())
        .then((data) => setStats(data))
        .catch((err) => console.error('Gagal memuat statistik:', err));
    }
  }, []);

  const pieData = {
    labels: ['Glioma', 'Meningioma', 'otumor', 'Pituitary'],
    datasets: [
      {
        data: [stats.glioma, stats.meningioma, stats.notumor, stats.pituitary],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8E44AD'],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: ['Glioma', 'Meningioma', 'No Tumor', 'Pituitary'],
    datasets: [
      {
        label: 'Jumlah Deteksi',
        data: [stats.glioma, stats.meningioma, stats.notumor, stats.pituitary],
        backgroundColor: '#3498db',
      },
    ],
  };

  return (
    <div className="p-4">
      <h2 className="mb-4">📈 Statistik Deteksi Tumor</h2>
      <Row>
        <Col md={6}>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <Card.Title className="mb-3">Pie Chart</Card.Title>
              <Pie data={pieData} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <Card.Title className="mb-3">Bar Chart</Card.Title>
              <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
