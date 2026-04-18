import { Container, Form, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { useI18n } from "../i18n";

export function WebsiteLayout() {
    const { locale, setLocale, t } = useI18n();

    return (
        <div>
            <div id="menu">
                <Navbar expand="md">
                    <Container>
                        <Navbar.Brand as={Link} to="/">
                            <b>{t("common.brand")}</b>
                        </Navbar.Brand>

                        <Navbar.Toggle aria-controls="menu-principal" />
                        <Navbar.Collapse id="menu-principal">
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to="/reviews">
                                    {t("nav.games")}
                                </Nav.Link>
                                <Nav.Link as={Link} to="/accuracy">
                                    {t("nav.accuracy")}
                                </Nav.Link>
                            </Nav>

                            <Form.Select
                                aria-label={t("common.language")}
                                className="w-auto"
                                value={locale}
                                onChange={(event) => setLocale(event.target.value)}
                            >
                                <option value="pt-BR">{t("languages.ptBR")}</option>
                                <option value="en-US">{t("languages.enUS")}</option>
                                <option value="es-ES">{t("languages.esES")}</option>
                                <option value="de-DE">{t("languages.deDE")}</option>
                            </Form.Select>

                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>

            <Container>
                <main>
                    <Outlet />
                </main>
            </Container>

            <footer className="mt-5 py-4 border-top" >
                <Container>
                    <div className="text-center">
                        <p className="mb-0">
                            <small>{t("common.poweredBy")} <strong>Rasekin</strong></small>
                        </p>
                    </div>
                </Container>
            </footer>

        </div>
    );
}