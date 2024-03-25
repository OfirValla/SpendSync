import { useCallback, useEffect, useState } from 'react';

const BORDER_SIZE = 4;

export const useResizeOnDragProfile = (min: number = 350) => {
    const [node, setNode] = useState<HTMLDivElement | null>(null);

    const ref = useCallback((nodeEle: HTMLDivElement) => {
        setNode(nodeEle);
    }, []);
    
    const resize = (e: MouseEvent) => {
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
        console.log(gridTemplate.join(' '))
        node!.parentElement!.style.gridTemplateColumns = gridTemplate.join(' ');
    }

    const mouseDown = (e: MouseEvent) => {
        if (e.x <= node!.getBoundingClientRect().left + BORDER_SIZE) {
            document.addEventListener("mousemove", resize, false);
            document.body.style.userSelect = 'none';
            document.body.style.cursor = 'ew-resize';
        }
    }

    const mouseUp = () => {
        document.removeEventListener("mousemove", resize, false);
        document.body.style.userSelect = 'unset';
        document.body.style.cursor = 'unset';
    }
    
    useEffect(() => {
        if (!node) return;

        node.addEventListener("mousedown", mouseDown, false);
        document.addEventListener("mouseup", mouseUp, false);

        return () => {
            node?.removeEventListener("mousedown", mouseDown, false);
            document.removeEventListener("mouseup", mouseDown, false);
        }

    }, [node]);

    return [ref];
};

export const useResizeOnDragGroup = (min: number = 350) => {
    const [node, setNode] = useState<HTMLDivElement | null>(null);

    const ref = useCallback((nodeEle: HTMLDivElement) => {
        setNode(nodeEle);
    }, []);

    const resize = (e: MouseEvent) => {
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

    const mouseDown = (e: MouseEvent) => {
        if (node!.getBoundingClientRect().x + BORDER_SIZE >= e.x) {
            document.addEventListener("mousemove", resize, false);
            document.body.style.userSelect = 'none';
            document.body.style.cursor = 'ew-resize';
        }
    };

    const mouseUp = () => {
        document.removeEventListener("mousemove", resize, false);
        document.body.style.userSelect = 'unset';
        document.body.style.cursor = 'unset';
    };

    useEffect(() => {
        if (!node) return;

        node.addEventListener("mousedown", mouseDown, false);
        document.addEventListener("mouseup", mouseUp, false);

        return () => {
            node?.removeEventListener("mousedown", mouseDown, false);
            document.removeEventListener("mouseup", mouseDown, false);
        };

    }, [node]);

    return [ref];
};
