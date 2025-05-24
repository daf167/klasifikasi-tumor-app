import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: '',
    age: '',
    username: '',
    email: '',
    password: '',
    gender: 'L',
  });

  const [errors, setErrors] = useState({});

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Hapus error saat diketik
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors({}); // Reset error

    try {
      const res = await fetch('http://localhost/klasifikasi_tumor-app/database/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        navigate('/login');
      } else {
        // Deteksi error spesifik dari server
        if (data.error.includes("Username")) {
          setErrors({ username: data.error });
        } else if (data.error.includes("Email")) {
          setErrors({ email: data.error });
        } else {
          setErrors({ general: data.error });
        }
      }
    } catch (err) {
      setErrors({ general: "Gagal menghubungi server" });
      console.error(err);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ maxWidth: '500px', width: '100%' }}>
        <div className="text-center mb-4">
          <h3 className="fw-bold text-primary">📝 Daftar Akun</h3>
          <p className="text-muted">Silakan isi form berikut untuk membuat akun</p>
        </div>

        {errors.general && <div className="alert alert-danger">{errors.general}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nama Lengkap</label>
            <input
              name="full_name"
              type="text"
              className={`form-control ${errors.full_name ? 'is-invalid' : ''}`}
              value={form.full_name}
              onChange={handleChange}
              required
            />
            {errors.full_name && <div className="invalid-feedback">{errors.full_name}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Usia</label>
            <input
              name="age"
              type="number"
              min="1"
              className={`form-control ${errors.age ? 'is-invalid' : ''}`}
              value={form.age}
              onChange={handleChange}
              required
            />
            {errors.age && <div className="invalid-feedback">{errors.age}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              name="username"
              type="text"
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
              value={form.username}
              onChange={handleChange}
              required
            />
            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              name="email"
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              value={form.email}
              onChange={handleChange}
              required
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              name="password"
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              value={form.password}
              onChange={handleChange}
              required
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          <div className="mb-4">
            <label className="form-label">Jenis Kelamin</label>
            <select
              name="gender"
              className="form-select"
              value={form.gender}
              onChange={handleChange}
              required
            >
              <option value="L">Laki-laki</option>
              <option value="P">Perempuan</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-3">
            Daftar Sekarang
          </button>

          <p className="text-center">
            Sudah punya akun? <a href="/login">Masuk di sini</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
