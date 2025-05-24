import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Container } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaVenusMars, FaBirthdayCake, FaSignOutAlt, FaArrowLeft } from 'react-icons/fa';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <Container className="py-5" style={{ maxWidth: '600px' }}>
      <h3 className="mb-4 fw-bold text-center">👤 Profil Pengguna</h3>
      <Card className="shadow-sm">
        <Card.Body>
          <p><FaUser className="me-2 text-primary" /> <strong>Nama Lengkap:</strong> {user.full_name}</p>
          <p><FaBirthdayCake className="me-2 text-warning" /> <strong>Usia:</strong> {user.age} tahun</p>
          <p><FaUser className="me-2 text-success" /> <strong>Username:</strong> {user.username}</p>
          <p><FaEnvelope className="me-2 text-info" /> <strong>Email:</strong> {user.email}</p>
          <p><FaVenusMars className="me-2 text-danger" /> <strong>Jenis Kelamin:</strong> {user.gender === 'L' ? 'Laki-laki' : 'Perempuan'}</p>

          <hr />

          <div className="d-grid gap-2">
            <Button variant="danger" onClick={handleLogout}>
              <FaSignOutAlt className="me-2" />
              Logout
            </Button>
            <Button variant="secondary" onClick={() => navigate('/dashboard')}>
              <FaArrowLeft className="me-2" />
              Kembali ke Dashboard
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
