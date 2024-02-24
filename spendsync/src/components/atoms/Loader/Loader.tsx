import { FC } from 'react';
import * as stylex from '@stylexjs/stylex';

import './Loader.css';

const styles = stylex.create({
    container: {
        display: 'grid',
        justifyContent: 'center',
        alignContent: 'center',
        height: '100vh',
        width: '100vw',
        position: 'absolute',
        top: '0',
        right: '0'
    },
    svg: {
        width: '20vw',
        height: '20vw',
        animation: 'spin 1s linear infinite'
    },
    circle: {
        fill: 'none',
        stroke: 'url(#linear)',
        strokeWidth: '3px',
        strokeLinecap: 'round',
        animation: 'dash 2.5s ease-in-out infinite'
    }
});

const Loader: FC = () => (
    <div {...stylex.props(styles.container)}>
        <svg viewBox="0 0 50 50" {...stylex.props(styles.svg)}>
            <defs>
                <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#007bff" />
                    <stop offset="100%" stopColor="#00aa55" />
                </linearGradient>
            </defs>
            <circle
                cx="25"
                cy="25"
                r="20"
                {...stylex.props(styles.circle)}
            />
        </svg>
    </div>
);

export default Loader;