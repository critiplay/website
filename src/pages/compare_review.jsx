import { useMemo, useState } from "react";
import { Button, Card, Col, Row, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import games from "../../games.json";
import { useI18n } from "../i18n";


const PAGE_SIZE = 3;

function getLatestReview(reviews, type) {
    return [...reviews]
        .filter((review) => review.type === type)
        .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
}

function getCriticReview(reviews, criticName) {
    const criticReviews = reviews.filter((review) => review.type === "critic");
    if (!criticName?.trim()) {
        return getLatestReview(reviews, "critic");
    }

    const lowerSearch = criticName.toLowerCase();
    const match = criticReviews.find((review) =>
        (review.critic || "").toLowerCase().includes(lowerSearch)
    );

    return match || getLatestReview(reviews, "critic");
}

function truncateText(text, maxLength = 280) {
    if (!text) {
        return "";
    }
    return text.length > maxLength ? `${text.slice(0, maxLength).trim()}...` : text;
}

export default function CompareReview() {
    const { t } = useI18n();
    const navigate = useNavigate();
    const { page: pageParam } = useParams();
    const [searchTerm, setSearchTerm] = useState("");

    // Filtrar jogos baseado no termo de pesquisa pelo nome do crítico e metascore válido
    const filteredGames = useMemo(() => {
        // Filtrar apenas jogos com metascore válido (user > 0 e critic > 0)
        let result = games.filter(item =>
            item.game.metascore.user > 0 && item.game.metascore.critic > 0
        );

        if (!searchTerm.trim()) return result;

        const lowerSearch = searchTerm.toLowerCase();
        return result.filter(item => {
            const critics = item.game.metascore.reviews
                .filter(rev => rev.type === "critic")
                .map(rev => (rev.critic || "").toLowerCase());
            return critics.some(c => c.includes(lowerSearch));
        });
    }, [searchTerm]);

    const totalPages = Math.max(1, Math.ceil(filteredGames.length / PAGE_SIZE));
    const page = Math.max(1, Math.min(totalPages, Number(pageParam) || 1));
    const currentGames = useMemo(() => {
        const startIndex = (page - 1) * PAGE_SIZE;
        return filteredGames.slice(startIndex, startIndex + PAGE_SIZE);
    }, [page, filteredGames]);

    const handlePage = (nextPage) => {
        const validPage = Math.max(1, Math.min(totalPages, nextPage));
        navigate(`/reviews/${validPage}`);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        navigate(`/reviews/1`);
    };

    const maxVisiblePages = 10;
    const startPage = Math.max(1, Math.min(page - Math.floor(maxVisiblePages / 2), totalPages - maxVisiblePages + 1));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

    return (
        <section className="py-4">
            <div className="mb-4">
                <h1>{t("reviews.title")}</h1>
                <p className="text-muted">
                    {t("reviews.subtitle")}
                </p>
            </div>

            <Card className="mt-4 bg-light border-0">
                <Card.Body>
                    <h3 className="h6 mb-3">{t('home.explanationTitle')}</h3>
                    <p className="mb-2">
                        <strong>{t('home.errorRuleLead')}</strong>
                    </p>
                    <ul className="mb-3">
                        <li>{t('home.errorRuleDefault')}</li>
                        <li>{t('home.errorRuleHighUser')}</li>
                    </ul>
                    <p>
                        {t('home.reliabilityDescription')}
                    </p>
                </Card.Body>
            </Card>

            {/* Campo de Pesquisa */}
            <div className="mb-4">
                <Form.Group>
                    <Form.Label htmlFor="searchInput">{t("reviews.searchByCritic")}</Form.Label>
                    <Form.Control
                        id="searchInput"
                        type="text"
                        placeholder={t("reviews.searchPlaceholder")}
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </Form.Group>
            </div>

            {currentGames.map((item) => {

                const { game } = item;

                let metascore = game.metascore;
                let reviews = metascore.reviews;

                const criticReview = getCriticReview(reviews, searchTerm);
                const userReview = getLatestReview(reviews, "user");
                const difference = Math.abs(metascore.critic - metascore.user);

                let userMetaClass = "text-success";
                let diff1 = metascore.user >= 78 && difference >= 5;
                let diff2 = metascore.user < 78 && difference >= 10;

                if (diff1 || diff2) {
                    userMetaClass = "text-danger";
                }

                return (
                    <Card key={game.id} className="mb-4 shadow-sm">
                        <Card.Body>
                            <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-3">
                                <div>
                                    <h2 className="h5 mb-1">{game.name}</h2>
                                    <p className="mb-0 text-muted">{t("reviews.release")}: {game.releasedOn}</p>
                                </div>
                                <div className="d-flex gap-3 flex-wrap">
                                    <div className={userMetaClass}>
                                        <strong>{t("reviews.metaCritic")}:</strong> {metascore.critic}
                                    </div>
                                    <div>
                                        <strong>{t("reviews.metaUser")}:</strong> {metascore.user}
                                    </div>
                                </div>
                            </div>

                            <Row className="gy-3">
                                <Col md={6}>
                                    <div className="border rounded p-3 h-100">
                                        <h3 className="h6 text-uppercase">{t("reviews.criticReviewTitle")}</h3>
                                        <p className="mb-2">
                                            <strong>{t("reviews.source")}:</strong> {criticReview?.critic || t("common.notInformed")}
                                        </p>
                                        <p className="mb-2">
                                            <strong>{t("reviews.reviewScore")}:</strong> {criticReview?.score ?? "—"}
                                        </p>
                                        <p className="text-muted mb-2">
                                            {criticReview ? t("reviews.evaluatedAt", { date: criticReview.date }) : t("reviews.noCriticReview")}
                                        </p>
                                        <p>{truncateText(criticReview?.review) || t("reviews.noReviewAvailable")}</p>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="border rounded p-3 h-100 bg-light">
                                        <h3 className="h6 text-uppercase">{t("reviews.userReviewTitle")}</h3>
                                        <p className="mb-2">
                                            <strong>{t("reviews.source")}:</strong> {t("reviews.userSource")}
                                        </p>
                                        <p className="mb-2">
                                            <strong>{t("reviews.reviewScore")}:</strong> {metascore.user}
                                        </p>
                                        <p className="text-muted mb-2">
                                            {userReview ? t("reviews.evaluatedAt", { date: userReview.date }) : t("reviews.noUserReview")}
                                        </p>
                                        <p>{truncateText(userReview?.review) || t("reviews.noReviewAvailable")}</p>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                );
            })}

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 mt-3">
                <span className="text-muted">
                    {filteredGames.length === 0 ? (
                        t("reviews.noResults")
                    ) : (
                        t("reviews.paginationWithResults", {
                            page,
                            totalPages,
                            results: filteredGames.length,
                            resultLabel: filteredGames.length === 1 ? t("reviews.resultSingular") : t("reviews.resultPlural")
                        })
                    )}
                </span>
                <div className="btn-group">
                    <Button variant="outline-secondary" disabled={page === 1 || filteredGames.length === 0} onClick={() => handlePage(page - 1)}>
                        {t("common.previous")}
                    </Button>
                    {pageNumbers.map((pageNumber) => (
                        <Button
                            key={pageNumber}
                            variant={page === pageNumber ? "secondary" : "outline-secondary"}
                            disabled={filteredGames.length === 0}
                            onClick={() => handlePage(pageNumber)}
                        >
                            {pageNumber}
                        </Button>
                    ))}
                    <Button variant="outline-secondary" disabled={page === totalPages || filteredGames.length === 0} onClick={() => handlePage(page + 1)}>
                        {t("common.next")}
                    </Button>
                </div>
            </div>
        </section>
    );
}
