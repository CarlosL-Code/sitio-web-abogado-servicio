"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowRight, X, Phone, MapPin, Scale, Briefcase, FileText, CheckCircle, Shield, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const REAL_NEWS = [
  { id: 1, title: "Sistema Nacional de Apoyos y Cuidados (2026)", image: "/images/services.jpg", tag: "Actualidad", desc: "La nueva ley reconoce el cuidado como un derecho fundamental, protegiendo a familias e infancia.", fullText: "Esta importante reforma implementada a inicios de 2026 establece por primera vez en Chile un enfoque integral hacia el cuidado..." },
  { id: 2, title: "Modificaciones a la Responsabilidad Penal", image: "/images/lawyer.jpg", tag: "Legislación", desc: "Recientes indicaciones buscan fortalecer el cumplimiento de sanciones en régimen cerrado para delitos graves.", fullText: "Tras un intenso debate parlamentario, se logró un consenso para evitar que los menores de 16 y 17 años sean juzgados como adultos..." },
  { id: 3, title: "Derecho a ser Oído de Niños y Niñas", image: "/images/contact.jpg", tag: "Jurisprudencia", desc: "La Corte Suprema reafirma su postura garantizando el derecho de los menores a opinar en procesos.", fullText: "En un fallo histórico este año, el máximo tribunal chileno dejó sin efecto una sentencia de cuidado personal debido a que el juez..." }
];

export default function PortfolioPage({ services }: { services: any[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [selectedNews, setSelectedNews] = useState<any | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth"
      });
      setIsMobileMenuOpen(false); // Close mobile menu if open
    }
  };

  return (
    <div>
      {/* Modals */}
      <AnimatePresence>
        {selectedNews && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedNews(null)}
          >
            <motion.div 
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelectedNews(null)}><X size={20} /></button>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>{selectedNews.title}</h2>
              <p style={{ color: 'var(--text-muted)' }}>{selectedNews.fullText}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="mobile-menu-content"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <button className="mobile-menu-close" onClick={() => setIsMobileMenuOpen(false)}>
                <X size={28} />
              </button>
              
              <div className="mobile-menu-brand" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '3rem', color: 'var(--color-primary)' }}>
                <Scale size={24} />
                <h1 style={{ fontSize: '1.2rem', fontWeight: 800 }}>MIRIAM CONTRERAS</h1>
              </div>
              
              <div className="mobile-menu-links">
                <a href="#inicio" onClick={(e) => handleScrollTo(e, 'inicio')}>Inicio</a>
                <a href="#nosotros" onClick={(e) => handleScrollTo(e, 'nosotros')}>Nosotros</a>
                <a href="#servicios" onClick={(e) => handleScrollTo(e, 'servicios')}>Servicios</a>
                <a href="#noticias" onClick={(e) => handleScrollTo(e, 'noticias')}>Publicaciones</a>
              </div>
              
              <div className="mobile-menu-footer">
                <Link href="/agendar" className="btn-solid-blue" style={{ width: '100%', textAlign: 'center', display: 'block', padding: '1rem', fontSize: '1rem' }}>
                  Agendar Cita
                </Link>
                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem', justifyContent: 'center', color: 'var(--text-muted)' }}>
                  <a href="#"><LinkedinIcon /></a>
                  <a href="#"><InstagramIcon /></a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className={`top-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-brand">
          <Scale size={24} />
          <h1>MIRIAM CONTRERAS</h1>
        </div>
        <div className="nav-links desktop-only">
          <a href="#inicio" onClick={(e) => handleScrollTo(e, 'inicio')}>Inicio</a>
          <a href="#nosotros" onClick={(e) => handleScrollTo(e, 'nosotros')}>Nosotros</a>
          <a href="#servicios" onClick={(e) => handleScrollTo(e, 'servicios')}>Servicios</a>
          <a href="#noticias" onClick={(e) => handleScrollTo(e, 'noticias')}>Publicaciones</a>
        </div>
        <div className="nav-contact desktop-only">
          <Link href="/agendar" className="btn-solid-blue">Agendar Cita</Link>
        </div>
        <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(true)}>
          <Menu size={28} />
        </button>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="hero-section">
        <div className="hero-overlay"></div>
        <motion.div 
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={stagger}
          transition={{ staggerChildren: 0.15 }}
        >
          <motion.h4 variants={fadeUp} transition={{ type: "spring", stiffness: 100, damping: 20 }} style={{ color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem', fontWeight: 600 }}>
            Especialista en Derecho de Familia
          </motion.h4>
          <motion.h1 variants={fadeUp} transition={{ type: "spring", stiffness: 100, damping: 20 }} className="hero-title">
            DEFENSA LEGAL<br/>CON INTEGRIDAD
          </motion.h1>
          <motion.p variants={fadeUp} transition={{ type: "spring", stiffness: 100, damping: 20 }} style={{ fontSize: '1.1rem', marginBottom: '2.5rem', color: 'rgba(255,255,255,0.8)' }}>
            Estrategias jurídicas a medida para proteger lo que más importa. Transparencia, empatía y resultados en tribunales chilenos.
          </motion.p>
          <motion.div variants={fadeUp} transition={{ type: "spring", stiffness: 100, damping: 20 }}>
            <Link href="/agendar" className="btn-solid-blue">Evaluación de Caso</Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Overlapping Services Cards */}
      <section className="container overlap-cards-wrapper">
        <motion.div 
          className="overlap-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          transition={{ staggerChildren: 0.15 }}
        >
          <motion.div variants={fadeUp} transition={{ type: "spring", stiffness: 100, damping: 20 }} className="overlap-card">
            <div className="overlap-icon"><Briefcase /></div>
            <h3 className="overlap-title">Asesoría Inicial</h3>
            <p className="overlap-desc">Evaluación completa de antecedentes y diseño de estrategia legal.</p>
          </motion.div>
          <motion.div variants={fadeUp} transition={{ type: "spring", stiffness: 100, damping: 20 }} className="overlap-card highlight">
            <div className="overlap-icon"><Scale /></div>
            <h3 className="overlap-title">Representación Judicial</h3>
            <p className="overlap-desc">Defensa integral en tribunales de familia y causas complejas.</p>
          </motion.div>
          <motion.div variants={fadeUp} transition={{ type: "spring", stiffness: 100, damping: 20 }} className="overlap-card">
            <div className="overlap-icon"><Shield /></div>
            <h3 className="overlap-title">Mediación Familiar</h3>
            <p className="overlap-desc">Asistencia y negociación en procesos de mediación obligatoria.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* About / Why Choose Us */}
      <section id="nosotros" className="about-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <h2 className="section-title">¿Por Qué Elegir Nuestro Estudio?</h2>
            <div className="timeline-dots">
              <div className="timeline-item">
                <span>Excelencia</span>
                <div className="dot active"></div>
              </div>
              <div className="line-connect"></div>
              <div className="timeline-item">
                <span>Transparencia</span>
                <div className="dot active"></div>
              </div>
              <div className="line-connect"></div>
              <div className="timeline-item">
                <span>Resultados</span>
                <div className="dot"></div>
              </div>
            </div>
          </motion.div>

          <div className="about-grid">
            <motion.div 
              className="about-images"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <Image src="/images/lawyer.jpg" alt="Miriam Contreras" width={500} height={600} className="about-img-main" />
              <Image src="/images/services.jpg" alt="Derecho de familia" width={400} height={300} className="about-img-sub" />
            </motion.div>
            
            <motion.div 
              className="about-text"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
            >
              <p style={{ color: 'var(--color-accent)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Abogada Directora</p>
              <h3>Miriam Contreras</h3>
              <p>
                Licenciada en ciencias jurídicas y diplomada en derecho de familia, infancia y adolescencia. Mi práctica legal se distingue por un enfoque altamente estructurado y corporativo, diseñado para resolver conflictos familiares con la máxima eficiencia y rigor.
              </p>
              <p>
                Entiendo que un proceso judicial no admite improvisaciones. Proveo a mis clientes de un acompañamiento estratégico 1 a 1, donde cada decisión está fundamentada en la más reciente jurisprudencia y en una planificación meticulosa.
              </p>
              <Link href="/agendar" className="btn-solid-blue" style={{ marginTop: '1rem' }}>Conocer Más</Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* News / Blog Section */}
      <section id="noticias" className="news-section">
        <div className="container">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            transition={{ staggerChildren: 0.15 }}
          >
            <motion.div variants={fadeUp} transition={{ type: "spring", stiffness: 100, damping: 20 }} className="news-header-flex">
              <h2 className="news-header-title">Abogada Diferente.<br/>Resultados Innovadores.</h2>
              <p className="news-header-desc">Análisis legal, jurisprudencia y actualidad comentada de forma sencilla y directa.</p>
            </motion.div>

            <div className="news-grid">
              {REAL_NEWS.map((news) => (
                <motion.div 
                  key={news.id} 
                  variants={fadeUp} 
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  className="news-card"
                  onClick={() => setSelectedNews(news)}
                >
                  <Image src={news.image} alt={news.title} width={400} height={250} className="news-image" />
                  <div className="news-content">
                    <span className="news-tag">{news.tag}</span>
                    <h3 className="news-title">{news.title}</h3>
                    <p className="news-desc">{news.desc}</p>
                    <div className="news-arrow"><ArrowRight size={20} /></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Unmatched Services (Dark Grid) */}
      <section id="servicios" className="dark-services">
        <div className="container dark-services-grid">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="dark-title">Servicios<br/>Legales<br/>De Excelencia.</h2>
            <p className="dark-desc">Nuestro portafolio de servicios está diseñado para proteger tu patrimonio y tu tranquilidad en cada etapa judicial.</p>
            <Link href="/agendar" className="btn-solid-blue" style={{ padding: '0.8rem 1.5rem', fontSize: '0.8rem' }}>Agendar Evaluación</Link>
          </motion.div>
          
          <motion.div 
            className="services-box-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            transition={{ staggerChildren: 0.15 }}
          >
            {services.map((service, idx) => (
              <motion.div key={service.id} variants={fadeUp} transition={{ type: "spring", stiffness: 100, damping: 20 }} className="service-box">
                <div className="service-box-header">
                  <div className="service-box-icon">
                    {idx === 0 ? <FileText size={28} /> : idx === 1 ? <Scale size={28} /> : <CheckCircle size={28} />}
                  </div>
                  <h4>{service.name}</h4>
                </div>
                <p>{service.description}</p>
                <div style={{ marginTop: 'auto', paddingTop: '1rem', color: 'var(--text-white)', fontWeight: 'bold' }}>{service.price}</div>
              </motion.div>
            ))}
            {/* Aditional Box for layout symmetry */}
            <motion.div variants={fadeUp} transition={{ type: "spring", stiffness: 100, damping: 20 }} className="service-box">
              <div className="service-box-header">
                <div className="service-box-icon"><Briefcase size={28} /></div>
                <h4>Asuntos Corporativos</h4>
              </div>
              <p>Asesoría a pymes y empresas familiares en constitución y regularización.</p>
              <div style={{ marginTop: 'auto', paddingTop: '1rem', color: 'var(--text-white)', fontWeight: 'bold' }}>Previa Evaluación</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-logo">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                <Scale size={32} color="var(--color-accent)" />
                <h2 style={{ margin: 0 }}>MIRIAM<br/>CONTRERAS</h2>
              </div>
              <p>Proveyendo servicios legales corporativos y de familia con los más altos estándares de eficiencia y transparencia en Chile.</p>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <a href="#"><LinkedinIcon /></a>
                <a href="#"><InstagramIcon /></a>
              </div>
            </div>
            
            <div className="footer-links">
              <h4>Servicios</h4>
              <ul>
                <li><a href="#">Asesoría Inicial</a></li>
                <li><a href="#">Representación</a></li>
                <li><a href="#">Mediación Familiar</a></li>
                <li><a href="#">Derecho Corporativo</a></li>
              </ul>
            </div>
            
            <div className="footer-links">
              <h4>Contacto</h4>
              <ul>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Phone size={16}/> +56 9 1234 5678</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Mail size={16}/> contacto@abogada.cl</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><MapPin size={16}/> Santiago, Chile</li>
              </ul>
            </div>
            
            <div className="footer-subscribe">
              <h4>Agendar</h4>
              <p>Reserva tu hora directamente en nuestra plataforma digital.</p>
              <Link href="/agendar" className="btn-solid-blue" style={{ display: 'block', textAlign: 'center', marginTop: '1rem' }}>Ir al Calendario</Link>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Miriam Contreras. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
