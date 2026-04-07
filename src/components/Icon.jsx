export default function Icon({ name, className = '' }) {
    const sharedProps = {
        viewBox: '0 0 16 16',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
        className: `menu-icon ${className}`.trim(),
        'aria-hidden': 'true'
    };

    switch (name) {
        case 'home':
            return (
                <svg {...sharedProps}>
                    <path d="M2.75 7.2L8 2.75L13.25 7.2V13.25H9.75V9.5H6.25V13.25H2.75V7.2Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case 'news':
            return (
                <svg {...sharedProps}>
                    <path d="M3 3.25H11.75C12.44 3.25 13 3.81 13 4.5V11.5C13 12.19 12.44 12.75 11.75 12.75H4.25C3.56 12.75 3 12.19 3 11.5V3.25Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                    <path d="M5.25 5.25H10.75M5.25 7.75H10.75M5.25 10.25H8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
            );
        case 'about':
            return (
                <svg {...sharedProps}>
                    <circle cx="8" cy="8" r="5.25" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M8 7V10.5M8 5.3H8.01" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
            );
        case 'registry':
            return (
                <svg {...sharedProps}>
                    <path d="M3.25 4.25H12.75V12.75H3.25V4.25Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                    <path d="M5.25 2.75V5.25M10.75 2.75V5.25M5.5 7.25H10.5M5.5 9.5H8.75" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
            );
        case 'menu':
            return (
                <svg {...sharedProps}>
                    <path d="M2.5 4.5H13.5M2.5 8H13.5M2.5 11.5H13.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
            );
        case 'github':
            return (
                <svg {...sharedProps}>
                    <path d="M8 1.5A6.5 6.5 0 0 0 1.5 8c0 2.29 1.2 4.3 3 5.45.23.04.31-.1.31-.22v-1c-1.22.27-1.48-.58-1.48-.58-.2-.5-.49-.64-.49-.64-.4-.27.03-.26.03-.26.45.03.68.46.68.46.39.69 1.03.49 1.28.37.04-.29.15-.49.28-.6-.97-.11-1.99-.49-1.99-2.17 0-.48.17-.87.45-1.18-.05-.12-.2-.57.04-1.18 0 0 .37-.12 1.2.45A4.1 4.1 0 0 1 8 5.6c.36 0 .72.05 1.06.14.84-.57 1.2-.45 1.2-.45.25.61.1 1.06.05 1.18.28.31.44.7.44 1.18 0 1.69-1.03 2.05-2 2.17.16.14.3.42.3.85v1.26c0 .12.08.26.31.22A6.5 6.5 0 0 0 14.5 8 6.5 6.5 0 0 0 8 1.5Z" fill="currentColor" />
                </svg>
            );
        case 'search':
            return (
                <svg {...sharedProps}>
                    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4" />
                    <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
            );
        case 'code':
            return (
                <svg {...sharedProps}>
                    <path d="M5.5 4.5L2.5 8L5.5 11.5M10.5 4.5L13.5 8L10.5 11.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case 'issues':
            return (
                <svg {...sharedProps}>
                    <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.4" />
                    <path d="M8 5.2V8.1M8 10.7H8.01" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
            );
        case 'pull':
            return (
                <svg {...sharedProps}>
                    <circle cx="5" cy="3.5" r="1.5" stroke="currentColor" strokeWidth="1.3" />
                    <circle cx="11" cy="12.5" r="1.5" stroke="currentColor" strokeWidth="1.3" />
                    <circle cx="11" cy="3.5" r="1.5" stroke="currentColor" strokeWidth="1.3" />
                    <path d="M5 5V10.2C5 11.43 6 12.5 7.3 12.5H9.5M11 5.1V11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case 'agents':
            return (
                <svg {...sharedProps}>
                    <path d="M8 2.5A2.5 2.5 0 1 0 8 7.5A2.5 2.5 0 1 0 8 2.5Z" stroke="currentColor" strokeWidth="1.3" />
                    <path d="M4.2 12.2C4.8 10.7 6.2 9.8 8 9.8C9.8 9.8 11.2 10.7 11.8 12.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
            );
        case 'play':
            return (
                <svg {...sharedProps}>
                    <path d="M6 4.5L11.5 8L6 11.5V4.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                </svg>
            );
        case 'grid':
            return (
                <svg {...sharedProps}>
                    <path d="M2.5 2.5H7V7H2.5V2.5ZM9 2.5H13.5V7H9V2.5ZM2.5 9H7V13.5H2.5V9ZM9 9H13.5V13.5H9V9Z" stroke="currentColor" strokeWidth="1.2" />
                </svg>
            );
        case 'book':
            return (
                <svg {...sharedProps}>
                    <path d="M3.5 3.3H7.6C8.45 3.3 9.13 3.98 9.13 4.83V12.7C8.84 12.36 8.38 12.15 7.88 12.15H3.5V3.3ZM12.5 3.3H8.4C7.55 3.3 6.87 3.98 6.87 4.83V12.7C7.16 12.36 7.62 12.15 8.12 12.15H12.5V3.3Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                </svg>
            );
        case 'shield':
            return (
                <svg {...sharedProps}>
                    <path d="M8 2.3L12.5 4V7.8C12.5 10.42 10.72 12.78 8 13.7C5.28 12.78 3.5 10.42 3.5 7.8V4L8 2.3Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                </svg>
            );
        case 'chart':
            return (
                <svg {...sharedProps}>
                    <path d="M2.5 12.5H13.5M4.5 10V7.2M8 10V4.7M11.5 10V6.1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
            );
        case 'gear':
            return (
                <svg {...sharedProps}>
                    <path d="M8 5.5A2.5 2.5 0 1 0 8 10.5A2.5 2.5 0 1 0 8 5.5Z" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M8 2.5V4M8 12V13.5M13.5 8H12M4 8H2.5M11.8 4.2L10.75 5.25M5.25 10.75L4.2 11.8M11.8 11.8L10.75 10.75M5.25 5.25L4.2 4.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
            );
        case 'copilot':
            return (
                <svg {...sharedProps}>
                    <rect x="2.5" y="4" width="11" height="8" rx="2" stroke="currentColor" strokeWidth="1.2" />
                    <circle cx="6" cy="8" r="1" fill="currentColor" />
                    <circle cx="10" cy="8" r="1" fill="currentColor" />
                    <path d="M5.5 10.2C6.1 10.7 6.96 11 8 11C9.04 11 9.9 10.7 10.5 10.2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                </svg>
            );
        case 'bell':
            return (
                <svg {...sharedProps}>
                    <path d="M8 13C8.83 13 9.5 12.33 9.5 11.5H6.5C6.5 12.33 7.17 13 8 13ZM12 10.5H4L4.8 9.54V7.3C4.8 5.47 6.1 4 8 4C9.9 4 11.2 5.47 11.2 7.3V9.54L12 10.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case 'plus':
            return (
                <svg {...sharedProps}>
                    <path d="M8 3.5V12.5M3.5 8H12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
            );
        case 'target':
            return (
                <svg {...sharedProps}>
                    <circle cx="8" cy="8" r="4.8" stroke="currentColor" strokeWidth="1.2" />
                    <circle cx="8" cy="8" r="1.5" fill="currentColor" />
                </svg>
            );
        case 'sliders':
            return (
                <svg {...sharedProps}>
                    <path d="M4 3.5V12.5M8 5V12.5M12 3.5V12.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    <circle cx="4" cy="6" r="1" fill="currentColor" />
                    <circle cx="8" cy="8" r="1" fill="currentColor" />
                    <circle cx="12" cy="5" r="1" fill="currentColor" />
                </svg>
            );
        case 'inbox':
            return (
                <svg {...sharedProps}>
                    <path d="M3 5.5H13L12.2 11.8H3.8L3 5.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                    <path d="M5 8.5H6.4L7.2 9.7H8.8L9.6 8.5H11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case 'avatar':
            return (
                <svg {...sharedProps}>
                    <circle cx="8" cy="6" r="2.2" fill="currentColor" />
                    <path d="M4.2 12.2C4.9 10.4 6.2 9.4 8 9.4C9.8 9.4 11.1 10.4 11.8 12.2" fill="currentColor" />
                </svg>
            );
        default:
            return null;
    }
}