export const blockIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: 24, height: 24 }}
        fill="none"
        viewBox="0 0 24 24"
        stroke="#1e1e1e"
        strokeWidth={2}>
        <path
            fill="#74a0f1"
            // fill="transparent"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
        />
        <path
            fill="#ffffff"
            // strokeWidth={1}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
        />
    </svg>
)
export const blockIconThin = (stroke = '#1e1e1e') => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: 24, height: 24 }}
        fill="none"
        viewBox="0 0 24 24"
        stroke={stroke}
        strokeWidth={1}>
        <path
            fill="transparent"
            // fill="transparent"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
        />
        <path
            fill="transparent"
            // strokeWidth={1}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
        />
    </svg>
)

export const closeX = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M13 11.8l6.1-6.3-1-1-6.1 6.2-6.1-6.2-1 1 6.1 6.3-6.5 6.7 1 1 6.5-6.6 6.5 6.6 1-1z" />
    </svg>
)
