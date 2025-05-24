import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import { FaBrain, FaCheckCircle, FaTimesCircle, FaPlus } from "react-icons/fa";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ total: 0, positives: 0, negatives: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (!userInfo) {
      navigate("/login");
    } else {
      setUser(userInfo);
      fetchStats(userInfo.id);
    }
  }, [navigate]);

  const fetchStats = async (userId) => {
    try {
      const res = await fetch(
        `http://localhost/klasifikasi_tumor-app/database/get_stats.php?user_id=${userId}`
      );
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Gagal mengambil statistik:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const chartData = {
    labels: ["Positive (Tumor)", "Negative (No Tumor)"],
    datasets: [
      {
        data: [stats.positives, stats.negatives],
        backgroundColor: ["#198754", "#dc3545"],
        borderColor: ["#198754", "#dc3545"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">🧠 Brain Tumor Detection</h2>
          {user && (
            <p className="text-muted mb-0">
              Welcome back, <strong>{user.full_name}</strong>
            </p>
          )}
        </div>
        <Button variant="outline-danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center shadow-sm border-primary">
            <Card.Body>
              <FaBrain size={36} className="text-primary mb-2" />
              <Card.Title>Total Detections</Card.Title>
              <h3 className="fw-bold text-primary">{stats.total}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center shadow-sm border-success">
            <Card.Body>
              <FaCheckCircle size={36} className="text-success mb-2" />
              <Card.Title>Positive Results</Card.Title>
              <h3 className="fw-bold text-success">{stats.positives}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center shadow-sm border-danger">
            <Card.Body>
              <FaTimesCircle size={36} className="text-danger mb-2" />
              <Card.Title>Negative Results</Card.Title>
              <h3 className="fw-bold text-danger">{stats.negatives}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

     <Card className="shadow-sm mb-4">
        <Card.Body>
          <Card.Title className="mb-3">📊 Detection Chart</Card.Title>
          <div style={{ maxWidth: "300px", margin: "0 auto" }}>
          <Pie data={chartData} />
        </div>
        </Card.Body>
      </Card>

      <div className="text-center">
        <Button
          variant="primary"
          size="lg"
          onClick={() => navigate("/new-detection")}
        >
          <FaPlus className="me-2" />
          Start New Detection
        </Button>
      </div>
    </Container>
  );
}

export default Dashboard;
