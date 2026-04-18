import React from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import games from '../../games.json';
import { useI18n } from '../i18n';

const Home = () => {
    const { t } = useI18n();

    // Filtrar jogos que possuem tanto metascore.user quanto metascore.critic maiores que zero
    const validGames = games.filter(game => 
        game.game.metascore.user > 0 && game.game.metascore.critic > 0
    );

    // Calcular estatísticas gerais de erros dos críticos
    const gameErrors = validGames.map(game => {
        const criticScore = game.game.metascore.critic;
        const userScore = game.game.metascore.user;
        const diff = Math.abs(criticScore - userScore);
        const threshold = userScore >= 78 ? 5 : 10;
        const isError = diff >= threshold;
        return { game: game.game.name, diff, criticScore, userScore, threshold, isError };
    });

    // Contar jogos onde críticos erraram (diferença >= threshold)
    const oopsCount = gameErrors.filter(item => item.isError).length;
    const totalGames = validGames.length;
    const errorPercentage = (oopsCount / totalGames) * 100;

    // Extrair e analisar confiabilidade de cada crítico
    const criticStats = {};

    validGames.forEach(game => {
        const criticsReviews = game.game.metascore.reviews.filter(rev => rev.type === 'critic');
        const usersReviews = game.game.metascore.reviews.filter(rev => rev.type === 'user');

        if (criticsReviews.length > 0 && usersReviews.length > 0) {
            const avgUserScore = usersReviews.reduce((sum, rev) => sum + (rev.score || 0), 0) / usersReviews.length;
            const threshold = avgUserScore >= 78 ? 3 : 5;

            criticsReviews.forEach(criticReview => {
                const criticName = criticReview.critic || 'Desconhecido';
                if (!criticStats[criticName]) {
                    criticStats[criticName] = {
                        name: criticName,
                        totalReviews: 0,
                        errorCount: 0,
                        reviews: []
                    };
                }
                
                // Verificar erro DESTE crítico em relação à média dos usuários
                const diff = Math.abs(criticReview.score - avgUserScore);
                const isError = diff >= threshold;
                
                criticStats[criticName].totalReviews += 1;
                if (isError) {
                    criticStats[criticName].errorCount += 1;
                }
                criticStats[criticName].reviews.push({
                    game: game.game.name,
                    criticScore: criticReview.score,
                    avgUserScore: avgUserScore,
                    isError: isError
                });
            });
        }
    });

    // Calcular média de confiabilidade por crítico
    const criticRanking = Object.values(criticStats)
        .map(critic => ({
            ...critic,
            avgAccuracy: critic.totalReviews > 0 ? ((critic.totalReviews - critic.errorCount) / critic.totalReviews) * 100 : 0
        }))
        .sort((a, b) => a.avgAccuracy - b.avgAccuracy);

    // Top 5 críticos menos confiáveis
    const worstCritics = criticRanking.slice(0, 5);

    return (
        <div className="container mt-5 mb-5">
            <div className="mb-5">
                <h1 className="mb-3">{t('home.title')}</h1>
                <p className="text-muted lead">
                    {t('home.subtitle')}
                </p>
            </div>

            {/* Estatísticas Gerais */}
            <Card className="mb-4 shadow-sm">
                <Card.Body>
                    <h2 className="h5 mb-4">{t('home.statsTitle')}</h2>
                    <Row className="g-4">
                        <Col md={6}>
                            <div className="d-flex flex-column">
                                <span className="text-muted small">{t('home.criticsErrors')}</span>
                                <h3 className="text-danger">
                                    {errorPercentage.toFixed(2)}%
                                </h3>
                                <small className="text-muted">
                                    {t('home.criticsErrorsSummary', { count: oopsCount, total: totalGames })}
                                </small>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="d-flex flex-column">
                                <span className="text-muted small">{t('home.averageDifference')}</span>
                                <h3 className="text-primary">
                                    {t('home.pointsSuffix', {
                                        value: (gameErrors.reduce((sum, item) => sum + item.diff, 0) / totalGames).toFixed(2)
                                    })}
                                </h3>
                                <small className="text-muted">
                                    {t('home.averageDifferenceSummary')}
                                </small>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            {/* Críticos Menos Confiáveis */}
            <Card className="shadow-sm">
                <Card.Body>
                    <h2 className="h5 mb-4">{t('home.unreliableCriticsTitle')}</h2>
                    <div className="list-group">
                        {worstCritics.map((critic, index) => (
                            <div key={critic.name} className="list-group-item border-start border-danger ps-3">
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                    <div>
                                        <h6 className="mb-1">
                                            {index + 1}. {critic.name}
                                        </h6>
                                        <small className="text-muted">
                                            {t('home.reviewsAnalyzed', { count: critic.totalReviews })}
                                        </small>
                                    </div>
                                    <Badge bg="danger" className="text-white">
                                        {t('home.unreliableBadge', { value: critic.avgAccuracy.toFixed(2) })}
                                    </Badge>
                                </div>
                                <div className="progress mt-2" style={{ height: '6px' }}>
                                    <div
                                        className="progress-bar bg-danger"
                                        style={{ width: `${critic.avgAccuracy}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card.Body>
            </Card>

            {/* Explicação */}
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
        </div>
    );
};

export default Home;