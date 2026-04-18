import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import games from '../../games.json';
import { useI18n } from '../i18n';

const PAGE_SIZE = 10;

const Accuracy = () => {
    const { t } = useI18n();
    const navigate = useNavigate();
    const { page: pageParam } = useParams();
    const [searchTerm, setSearchTerm] = useState('');

    // Calcular jogos onde a diferença excedeu o limite crítico
    const allCriticalDifferences = games.map(game => {
        const criticScore = game.game.metascore.critic;
        const userScore = game.game.metascore.user;
        const diff = Math.abs(criticScore - userScore);
        const threshold = userScore >= 78 ? 3 : 5;
        const exceeded = diff >= threshold;
        return { game: game.game.name, criticScore, userScore, diff, threshold, exceeded };
    });

    // Filtrar por termo de pesquisa
    const criticalDifferences = allCriticalDifferences.filter(item =>
        item.game.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Contar jogos com diferença crítica
    const countExceeded = allCriticalDifferences.filter(item => item.exceeded).length;
    const totalGames = games.length;
    const percentage = (countExceeded / totalGames) * 100;

    const totalPages = Math.max(1, Math.ceil(criticalDifferences.length / PAGE_SIZE));
    const page = Math.max(1, Math.min(totalPages, Number(pageParam) || 1));
    const startIndex = (page - 1) * PAGE_SIZE;
    const currentCriticalDifferences = criticalDifferences.slice(startIndex, startIndex + PAGE_SIZE);

    const handlePage = (nextPage) => {
        const validPage = Math.max(1, Math.min(totalPages, nextPage));
        navigate(`/accuracy/${validPage}`);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        navigate(`/accuracy/1`);
    };

    const maxVisiblePages = 10;
    const startPage = Math.max(1, Math.min(page - Math.floor(maxVisiblePages / 2), totalPages - maxVisiblePages + 1));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

    return (
        <div className="container mt-5">
            <h1>{t('accuracy.title')}</h1>
            <p>{t('accuracy.summary', { percentage: percentage.toFixed(2), countExceeded, totalGames })}</p>
            
            {/* Campo de Pesquisa */}
            <div className="mt-4 mb-4">
                <Form.Group>
                    <Form.Label htmlFor="searchInput">{t('accuracy.searchGame')}</Form.Label>
                    <Form.Control
                        id="searchInput"
                        type="text"
                        placeholder={t('accuracy.searchPlaceholder')}
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </Form.Group>
            </div>

            <div className="mt-4">
                <h3>{t('accuracy.detailsTitle', { page, totalPages })}</h3>
                <ul className="list-group">
                    {currentCriticalDifferences.map((item, index) => (
                        <li key={startIndex + index} className={`list-group-item ${item.exceeded ? 'list-group-item-danger' : 'list-group-item-success'}`}>
                            <strong>{item.game}</strong>: {t('accuracy.detailItem', {
                                criticScore: item.criticScore,
                                userScore: item.userScore,
                                diff: item.diff,
                                threshold: item.threshold,
                                status: item.exceeded ? t('accuracy.exceeded') : t('accuracy.notExceeded')
                            })}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Explicação */}
            <Card className="mt-4 bg-light border-0">
                <Card.Body>
                    <h3 className="h6 mb-3">{t('accuracy.explanationTitle')}</h3>
                    <p className="mb-2">
                        <strong>{t('accuracy.errorRuleLead')}</strong>
                    </p>
                    <ul className="mb-3">
                        <li>{t('accuracy.errorRuleDefault')}</li>
                        <li>{t('accuracy.errorRuleHighUser')}</li>
                    </ul>
                    <p>
                        {t('accuracy.reliabilityDescription')}
                    </p>
                </Card.Body>
            </Card>

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 mt-3">
                <span className="text-muted">{t('accuracy.pageInfo', { page, totalPages })}</span>
                <div className="btn-group">
                    <Button variant="outline-secondary" disabled={page === 1} onClick={() => handlePage(page - 1)}>
                        {t('common.previous')}
                    </Button>
                    {pageNumbers.map((pageNumber) => (
                        <Button
                            key={pageNumber}
                            variant={page === pageNumber ? "secondary" : "outline-secondary"}
                            onClick={() => handlePage(pageNumber)}
                        >
                            {pageNumber}
                        </Button>
                    ))}
                    <Button variant="outline-secondary" disabled={page === totalPages} onClick={() => handlePage(page + 1)}>
                        {t('common.next')}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Accuracy;