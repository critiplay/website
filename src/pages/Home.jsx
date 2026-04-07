export default function Home() {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center text-center" style={{ height: '70vh' }}>

            <div style={{ fontSize: 40, opacity: 0.6 }}>📖</div>

            <h3 className="mt-3" style={{ color: '#fff' }}>
                Bem vindo ao CritiPlay
            </h3>

            <p style={{ maxWidth: 600, color: '#8b949e' }}>
                Aqui voce pode criar e compartilhar suas criticas de jogos favoritos, e tambem ler as criticas de outros usuarios. Para comecar, crie a primeira pagina de critica e compartilhe suas opinioes com a comunidade!
            </p>
        </div>
    );
}