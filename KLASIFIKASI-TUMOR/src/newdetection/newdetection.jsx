import React, { useState } from 'react';
import {
  Container, Card, Button, Alert, Form, Row, Col, Spinner,
} from 'react-bootstrap';
import { FaMicroscope, FaUpload, FaInfoCircle } from 'react-icons/fa';

function NewDetection() {
  const [image, setImage] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [result, setResult] = useState('');
  const [file, setFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false); // 🔄 Tambah loading state

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;

  const handleImageUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    setErrorMsg('');
    setResult('');

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        setImageData(img);
        setImage(URL.createObjectURL(uploadedFile));
      };
    };
    reader.readAsDataURL(uploadedFile);
  };

  const handlePredict = async () => {
    if (!file || !userId) {
      setErrorMsg('User tidak ditemukan atau belum login.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('user_id', userId);

    setLoading(true); // 🔄 Aktifkan spinner

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setResult(`${data.result} (Confidence: ${data.confidence}%)`);
        setErrorMsg('');
      } else {
        setResult('');
        setErrorMsg(data.error || 'Gagal memproses gambar.');
      }
    } catch (err) {
      console.error('Error:', err);
      setErrorMsg('Gagal menghubungi server.');
    } finally {
      setLoading(false); // 🔄 Matikan spinner
    }
  };

  return (
    <Container fluid className="py-4">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8} xl={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="mb-4 d-flex align-items-center">
                <FaMicroscope className="me-2" />
                Deteksi Tumor Otak
              </Card.Title>

              <Alert variant="secondary">
                <FaInfoCircle className="me-2" />
                <strong>Cara Penggunaan:</strong>
                <ul className="mt-2 mb-0 ps-3">
                  <li>Unggah gambar MRI otak (JPG, JPEG, PNG).</li>
                  <li>Pastikan itu bukan makanan, hewan, atau organ selain otak.</li>
                  <li>Klik <strong>Mulai Deteksi</strong> untuk klasifikasi.</li>
                  <li>Hasil akan otomatis tersimpan ke riwayat.</li>
                </ul>
              </Alert>

              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Unggah Gambar MRI</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handleImageUpload} />
              </Form.Group>

              {image && (
                <div className="text-center mb-3">
                  <img
                    src={image}
                    alt="MRI Preview"
                    className="img-fluid rounded border"
                    style={{ maxHeight: '300px', width: '100%', objectFit: 'contain' }}
                  />
                </div>
              )}

              <div className="d-grid">
                <Button
                  variant="primary"
                  onClick={handlePredict}
                  disabled={!file || loading}
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Sedang memproses...
                    </>
                  ) : (
                    <>
                      <FaUpload className="me-2" />
                      Mulai Deteksi
                    </>
                  )}
                </Button>
              </div>

              {result && (
                <Alert variant="info" className="mt-4 text-center">
                  <strong>Hasil:</strong> {result}
                </Alert>
              )}

              {errorMsg && (
                <Alert variant="danger" className="mt-3 text-center">
                  ⚠️ {errorMsg}
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default NewDetection;
