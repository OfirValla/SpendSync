import { FC, ReactChild, ReactFragment, ReactPortal } from 'react';
import stylex from '@stylexjs/stylex';

import { overlay } from '../../../styles/global';
import { drawer } from '../../../styles/drawer';

interface DrawerProps {
    open: boolean;
    onClose: () => void;
    children: ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
}

const Drawer: FC<DrawerProps> = ({ open, onClose, children }) => {

    return (
        <>
            <div
                {...stylex.props(overlay.base, open ? overlay.open : overlay.close)}
                onClick={onClose}
                aria-hidden="true"
            />
            <div
                tabIndex={-1}
                {...stylex.props(drawer.base, open ? drawer.animate : drawer.hidden)}
            >
                {children}
            </div>
        </>
    );
};

export default Drawer;