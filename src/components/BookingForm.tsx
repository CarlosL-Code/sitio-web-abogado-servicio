"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, Clock, User, Mail, Phone, ChevronRight, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BookingForm({ services }: { services: any[] }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    serviceId: "",
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
    notes: ""
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step === 1 && !formData.serviceId) return alert("Por favor selecciona un servicio.");
    if (step === 2 && (!formData.date || !formData.time)) return alert("Por favor selecciona fecha y hora.");
    setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setSuccess(true);
      } else {
        alert("Ocurrió un error al agendar tu cita. Por favor intenta de nuevo.");
      }
    } catch (error) {
      alert("Error de conexión.");
    }
    
    setLoading(false);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.2 } }
  };

  if (success) {
    return (
      <div className="booking-page-container">
        <div className="booking-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <CheckCircle size={64} color="var(--color-accent)" style={{ margin: '0 auto 1.5rem' }} />
          <h2 style={{ fontSize: '2rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>¡Reserva Confirmada!</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Tu solicitud ha sido enviada exitosamente. Te enviaremos un correo de confirmación con los detalles de tu cita y las instrucciones para nuestra reunión.</p>
          <Link href="/" className="btn-solid-blue">Volver al Inicio</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page-container">
      <Link href="/" className="back-link"><ArrowLeft size={16} /> Volver al inicio</Link>
      
      <div className="booking-card">
        <div className="booking-header">
          <h2>Agendar Cita</h2>
          <p>Sigue los pasos para reservar tu evaluación legal con la abogada Miriam Contreras.</p>
          
          <div className="booking-steps">
            <div className={`step-indicator ${step >= 1 ? 'active' : ''}`}>1. Servicio</div>
            <div className="step-line"></div>
            <div className={`step-indicator ${step >= 2 ? 'active' : ''}`}>2. Fecha y Hora</div>
            <div className="step-line"></div>
            <div className={`step-indicator ${step >= 3 ? 'active' : ''}`}>3. Tus Datos</div>
          </div>
        </div>

        <div className="booking-body">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: SERVICE */}
            {step === 1 && (
              <motion.div key="step1" variants={fadeUp} initial="hidden" animate="visible" exit="exit" className="step-container">
                <h3>Selecciona el servicio que necesitas</h3>
                <div className="services-selection">
                  {services.map((service) => (
                    <div 
                      key={service.id} 
                      className={`service-option ${formData.serviceId === service.id ? 'selected' : ''}`}
                      onClick={() => setFormData({ ...formData, serviceId: service.id })}
                    >
                      <div className="service-opt-header">
                        <h4>{service.name}</h4>
                        <span className="price-badge">{service.price}</span>
                      </div>
                      <p>{service.description}</p>
                    </div>
                  ))}
                </div>
                <div className="step-actions right">
                  <button onClick={handleNext} className="btn-solid-blue">Siguiente Paso <ChevronRight size={18} /></button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: DATE AND TIME */}
            {step === 2 && (
              <motion.div key="step2" variants={fadeUp} initial="hidden" animate="visible" exit="exit" className="step-container">
                <h3>Elige tu disponibilidad</h3>
                <div className="datetime-selection">
                  <div className="form-group-booking">
                    <label><CalendarIcon size={16} /> Fecha preferida</label>
                    <input 
                      type="date" 
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]} // Cannot select past dates
                      className="booking-input"
                    />
                  </div>
                  <div className="form-group-booking">
                    <label><Clock size={16} /> Horario preferido</label>
                    <select name="time" value={formData.time} onChange={handleChange} className="booking-input">
                      <option value="">Selecciona una hora</option>
                      <option value="09:00">09:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:30">11:30 AM</option>
                      <option value="15:00">03:00 PM</option>
                      <option value="16:30">04:30 PM</option>
                      <option value="18:00">06:00 PM</option>
                    </select>
                  </div>
                </div>
                <div className="step-actions split">
                  <button onClick={handleBack} className="btn-outline-blue">Volver</button>
                  <button onClick={handleNext} className="btn-solid-blue">Último Paso <ChevronRight size={18} /></button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: CONTACT INFO */}
            {step === 3 && (
              <motion.div key="step3" variants={fadeUp} initial="hidden" animate="visible" exit="exit" className="step-container">
                <h3>Tus Datos de Contacto</h3>
                <form onSubmit={handleSubmit} className="contact-info-form">
                  <div className="form-group-booking">
                    <label><User size={16} /> Nombre Completo</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="booking-input" />
                  </div>
                  <div className="form-grid-2">
                    <div className="form-group-booking">
                      <label><Mail size={16} /> Correo Electrónico</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} required className="booking-input" />
                    </div>
                    <div className="form-group-booking">
                      <label><Phone size={16} /> Teléfono (Opcional)</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="booking-input" />
                    </div>
                  </div>
                  <div className="form-group-booking">
                    <label>Breve descripción de tu caso (Opcional)</label>
                    <textarea name="notes" value={formData.notes} onChange={handleChange} rows={3} className="booking-input"></textarea>
                  </div>
                  
                  <div className="step-actions split">
                    <button type="button" onClick={handleBack} className="btn-outline-blue">Volver</button>
                    <button type="submit" className="btn-solid-blue" disabled={loading}>
                      {loading ? 'Procesando...' : 'Confirmar Reserva'} <CheckCircle size={18} />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
