import { useState } from "react";
import { Button, Carousel, Container, Form, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

const slides = [
    {
        id: 1,
        titulo: "THE LAST OF US",
        subtitulo: "PART II",
        nota: 95,
        descricao: "Friday's hugely anticipated PS4 exclusive is an even better sequel to Naughty Dog's 2013 hit.",
        imagem:
            "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1800&q=80",
    },
    {
        id: 2,
        titulo: "GOD OF WAR",
        subtitulo: "RAGNAROK",
        nota: 94,
        descricao: "Uma jornada brutal e emocional, com combate refinado e direção cinematografica de alto nivel.",
        imagem:
            "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=1800&q=80",
    },
    {
        id: 3,
        titulo: "ELDEN RING",
        subtitulo: "SHADOW",
        nota: 96,
        descricao: "Mundo vasto, liberdade de exploracao e batalhas memoraveis elevam o genero de RPG de acao.",
        imagem:
            "https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=1800&q=80",
    },
];

export function WebsiteLayout() {
    const [activeSlide, setActiveSlide] = useState(0);

    const handlePrev = () => {
        setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    return (
        <div>
            <div id="menu">
                <Navbar expand="md">
                    <Container>
                        <Navbar.Brand as={Link} to="/">
                            <b>critiplay</b>
                        </Navbar.Brand>

                        <Navbar.Toggle aria-controls="menu-principal" />
                        <Navbar.Collapse id="menu-principal">
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to="/">
                                    Games
                                </Nav.Link>
                                <Nav.Link as={Link} to="/page1">
                                    Metacritic
                                </Nav.Link>
                                <Nav.Link as={Link} to="/page2">
                                    Steam
                                </Nav.Link>
                                <Nav.Link as={Link} to="/page2">
                                    Comunidade
                                </Nav.Link>
                            </Nav>
                            <div className="d-flex flex-column flex-md-row align-items-stretch align-items-md-center gap-2 mt-3 mt-md-0 ms-md-auto">
                                <Form className="d-flex" role="search">
                                    <Form.Control
                                        type="search"
                                        placeholder="Pesquisar títulos..."
                                        aria-label="Pesquisar"
                                        className="menu-input"
                                    />
                                </Form>
                                <Button type="button" className="menu-btn-primary">
                                    Sign Up
                                </Button>
                                <Button type="button" className="menu-btn-outline">
                                    Login
                                </Button>
                            </div>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>

            <div id="carousel" className="hero-section">
                <Container>
                    <div className="hero-shell">
                        <Carousel
                            activeIndex={activeSlide}
                            onSelect={(selectedIndex) => setActiveSlide(selectedIndex)}
                            controls={false}
                            indicators={false}
                            interval={5500}
                            pause="hover"
                            className="hero-carousel"
                        >
                            {slides.map((slide) => (
                                <Carousel.Item key={slide.id}>
                                    <img src={slide.imagem} alt={slide.titulo} className="hero-image" />
                                    <div className="hero-overlay" />
                                    <div className="hero-content">
                                        <div className="hero-title-wrap">
                                            <h2 className="hero-title">{slide.titulo}</h2>
                                            <p className="hero-subtitle">{slide.subtitulo}</p>
                                        </div>
                                        <span className="hero-score">{slide.nota}</span>
                                        <p className="hero-description">{slide.descricao}</p>
                                    </div>
                                </Carousel.Item>
                            ))}
                        </Carousel>

                        <button type="button" className="hero-control hero-control-prev" onClick={handlePrev} aria-label="Slide anterior">
                            &#8249;
                        </button>
                        <button type="button" className="hero-control hero-control-next" onClick={handleNext} aria-label="Proximo slide">
                            &#8250;
                        </button>

                        <div className="hero-indicators-panel" aria-label="Indicadores do carrossel">
                            {slides.map((slide, index) => (
                                <button
                                    key={slide.id}
                                    type="button"
                                    className={`hero-dot ${activeSlide === index ? "active" : ""}`}
                                    onClick={() => setActiveSlide(index)}
                                    aria-label={`Ir para slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </Container>
            </div>

            <Container>
                <main>
                    <Outlet />
                </main>
            </Container>

        </div>
    );
}