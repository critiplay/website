import { memo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '../Icon';

import './Menu.css';

const menuConfig = {
	colors: {
		background: '#010409',
		border: '#21262d',
		text: '#f0f6fc',
		muted: '#8b949e',
		searchBackground: '#0d1117',
		buttonHover: '#161b22',
		buttonBorder: '#30363d',
		activeUnderline: '#f78166',
		accent: '#2f81f7',
		avatar: '#b6e36d'
	},
	repository: {
		owner: 'CritiPlay',
		name: 'Games Reviews'
	},
	search: {
		placeholder: 'Type / to search',
		shortcut: '/'
	},
	topActions: [
		// { id: 'copilot', label: 'Copilot', icon: 'copilot' },
		// { id: 'issues', label: 'Issues', icon: 'issues' },
		// { id: 'notifications', label: 'Notificacoes', icon: 'bell' },
		// { id: 'create', label: 'Criar', icon: 'plus', hasCaret: true },
		// { id: 'focus', label: 'Foco', icon: 'target' },
		// { id: 'settings', label: 'Controles', icon: 'sliders' },
		// { id: 'pull-requests', label: 'Pull requests', icon: 'pull' },
		// { id: 'inbox', label: 'Inbox', icon: 'inbox' },
		// { id: 'avatar', label: 'Perfil', icon: 'avatar', accent: true }
	],
	navItems: [
		{ to: '/', label: 'Home', icon: 'home', end: true },
		{ to: '/page1', label: 'News', icon: 'news' },
		{ to: '/page2', label: 'About', icon: 'about' },
		{ to: '/page2', label: 'Registry', icon: 'registry' },
	]
};

function Menu() {
	const [isOpen, setIsOpen] = useState(false);

	const styleVars = {
		'--menu-bg': menuConfig.colors.background,
		'--menu-border': menuConfig.colors.border,
		'--menu-text': menuConfig.colors.text,
		'--menu-muted': menuConfig.colors.muted,
		'--menu-search-bg': menuConfig.colors.searchBackground,
		'--menu-button-hover': menuConfig.colors.buttonHover,
		'--menu-button-border': menuConfig.colors.buttonBorder,
		'--menu-active-underline': menuConfig.colors.activeUnderline,
		'--menu-accent': menuConfig.colors.accent,
		'--menu-avatar': menuConfig.colors.avatar
	};

	return (
		<header className="menu-shell" style={styleVars}>
			<div className="menu-container">
				<div className="menu-topbar">
					<button
						type="button"
						className="menu-icon-button menu-mobile-toggle"
						aria-label="Abrir menu"
						aria-expanded={isOpen}
						onClick={() => setIsOpen((currentValue) => !currentValue)}
					>
						<Icon name="menu" />
					</button>

					<div className="menu-repository">
						<strong className="menu-repository__owner">{menuConfig.repository.owner}</strong>
					
						<span className="menu-repository__name">{menuConfig.repository.name}</span>
					</div>

					{/* <form className="menu-search menu-search--desktop" role="search">
						<Icon name="search" className="menu-search__icon" />
						<input
							type="search"
							className="menu-search__input"
							placeholder={menuConfig.search.placeholder}
							aria-label={menuConfig.search.placeholder}
						/>
						<span className="menu-search__shortcut">{menuConfig.search.shortcut}</span>
					</form> */}

					{/* <div className="menu-top-actions">
						{menuConfig.topActions.map((item) => (
							<button
								key={item.id}
								type="button"
								className={`menu-icon-button${item.accent ? ' menu-icon-button--accent' : ''}`}
								aria-label={item.label}
							>
								<Icon name={item.icon} />
								{item.hasCaret ? <span className="menu-caret" aria-hidden="true">▼</span> : null}
							</button>
						))}
					</div> */}
				</div>

				<div className={`menu-collapse${isOpen ? ' menu-collapse--open' : ''}`}>
					{/* <form className="menu-search menu-search--mobile" role="search">
						<Icon name="search" className="menu-search__icon" />
						<input
							type="search"
							className="menu-search__input"
							placeholder={menuConfig.search.placeholder}
							aria-label={menuConfig.search.placeholder}
						/>
						<span className="menu-search__shortcut">{menuConfig.search.shortcut}</span>
					</form> */}

					<nav className="menu-nav" aria-label="Navegacao principal do repositorio">
						{menuConfig.navItems.map((item) => {
							if (item.to) {
								return (
									<NavLink
										key={`${item.label}-${item.to}`}
										to={item.to}
										end={item.end}
										onClick={() => setIsOpen(false)}
										className={({ isActive }) => `menu-tab${isActive ? ' menu-tab--active' : ''}`}
									>
										<Icon name={item.icon} />
										<span>{item.label}</span>
									</NavLink>
								);
							}

							return (
								<button
									key={item.label}
									type="button"
									className={`menu-tab menu-tab--button${item.active ? ' menu-tab--active' : ''}`}
								>
									<Icon name={item.icon} />
									<span>{item.label}</span>
								</button>
							);
						})}
					</nav>
				</div>
			</div>
		</header>
	);
}

export default memo(Menu);