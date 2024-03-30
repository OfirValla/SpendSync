import { useCallback, useEffect, useState } from 'react';
import { resize as resizeStyles } from '../styles/global.stylex';
import stylex from '@stylexjs/stylex';
import { isMobile } from 'react-device-detect';

const BORDER_SIZE = 4;

const useSharedLogic = (isMouseDown: (e: MouseEvent, rect: DOMRect) => boolean, resizeLogic: (e: MouseEvent, node: HTMLDivElement) => void) => {
    const [node, setNode] = useState<HTMLDivElement | null>(null);

    const ref = useCallback((nodeEle: HTMLDivElement) => {
        setNode(nodeEle);
    }, []);

    const enableResize = () => {
        const lastElementClasses = [...[...node!.children!].at(-1)!.classList];
        const resizeBarClasses = stylex.props(resizeStyles.desktop).className!.split(' ')!;

        // Preventing multiple resize bar elements
        if (resizeBarClasses.every(c => lastElementClasses.includes(c)))
            return;

        // Adding the base styles
        node!.classList.add(...stylex.props(resizeStyles.container).className!.split(' ')!);

        // Adding the draggable bar
        const newElement = document.createElement('span');
        newElement.classList.add(...resizeBarClasses);

        node!.appendChild(newElement);
    }

    const resize = (e: MouseEvent) => resizeLogic(e, node!);

    const onMouseDown = (e: MouseEvent) => {
        if (!isMouseDown(e, node!.getBoundingClientRect()))
            return;

        document.addEventListener("mousemove", resize, false);
        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'ew-resize';
    }

    const onMouseUp = () => {
        document.removeEventListener("mousemove", resize, false);
        document.body.style.userSelect = 'unset';
        document.body.style.cursor = 'unset';
    }

    useEffect(() => {
        if (isMobile) return;
        if (!node) return;

        enableResize();

        node.addEventListener("mousedown", onMouseDown, false);
        document.addEventListener("mouseup", onMouseUp, false);

        return () => {
            node?.removeEventListener("mousedown", onMouseDown, false);
            document.removeEventListener("mouseup", onMouseDown, false);
        };

    }, [node]);

    return {
        ref,
    }
}

export const useResizeOnDragProfile = (min: number = 350) => {
    const resize = (e: MouseEvent, node: HTMLDivElement) => {
        const minExpensesSize = window.innerWidth / 4;

        const newWidth = window.innerWidth - e.x;
        const gridTemplate = getComputedStyle(node!.parentElement!).gridTemplateColumns.split(' ');

        const groupInfoSize = parseInt(gridTemplate[1].replace('px', ''));

        // Check if the expenses has enough space for show
        if (window.innerWidth - (groupInfoSize + node!.getBoundingClientRect().width) <= minExpensesSize) {
            if (e.x < node!.getBoundingClientRect().left) // Disallow grow but allow shrink 
                return;
        }

        if (groupInfoSize + node!.getBoundingClientRect().width + BORDER_SIZE >= window.innerWidth) return;
        if (newWidth < min) return;
        
        node!.style.width = `${newWidth}px`;

        gridTemplate[2] = `${newWidth}px`;
        gridTemplate[0] = '1fr';
        node!.parentElement!.style.gridTemplateColumns = gridTemplate.join(' ');
    }

    const isMouseDown = (e: MouseEvent, rect: DOMRect) => e.x <= rect.left + BORDER_SIZE;
    
    const { ref } = useSharedLogic(isMouseDown, resize);

    return [ref];
};

export const useResizeOnDragGroup = (min: number = 350) => {
    const resize = (e: MouseEvent, node: HTMLDivElement) => {
        const minExpensesSize = window.innerWidth / 4;
        const newWidth = node!.getBoundingClientRect().right - e.x;

        // Check if the expenses has enough space for show
        if (node!.getBoundingClientRect().left <= minExpensesSize) {
            if (e.x < node!.getBoundingClientRect().left) // Disallow grow but allow shrink 
                return;
        }

        if (e.x > window.innerWidth || e.x < 0) return;
        if (newWidth < min) return;
        node!.style.width = `${newWidth}px`;

        const gridTemplate = getComputedStyle(node!.parentElement!).gridTemplateColumns.split(' ');
        gridTemplate[1] = `${newWidth}px`;
        gridTemplate[0] = '1fr';
        node!.parentElement!.style.gridTemplateColumns = gridTemplate.join(' ');
    };

    const isMouseDown = (e: MouseEvent, rect: DOMRect) => rect.x + BORDER_SIZE >= e.x;

    const { ref } = useSharedLogic(isMouseDown, resize);

    return [ref];
};
