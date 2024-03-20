import { useCallback, useEffect, useState } from 'react';

const BORDER_SIZE = 4;

export const useResizeOnDragProfile = (min: number = 350) => {
    const [node, setNode] = useState<HTMLDivElement | null>(null);

    const ref = useCallback((nodeEle: HTMLDivElement) => {
        setNode(nodeEle);
    }, []);
    
    const resize = (e: MouseEvent) => {
        if (e.x < min) return;
        
        node!.style.width = `${e.x}px`;

        const gridTemplate = getComputedStyle(node!.parentElement!).gridTemplateColumns.split(' ');
        gridTemplate[0] = `${e.x}px`;
        gridTemplate[2] = '1fr';
        node!.parentElement!.style.gridTemplateColumns = gridTemplate.join(' ');
    }

    const mouseDown = (e: MouseEvent) => {
        if (e.x >= parseInt(getComputedStyle(node!, '').width) - BORDER_SIZE) {
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
        if (e.x - node!.getBoundingClientRect().left < min) return;
        node!.style.width = `${e.x - node!.getBoundingClientRect().left}px`;

        const gridTemplate = getComputedStyle(node!.parentElement!).gridTemplateColumns.split(' ');
        gridTemplate[1] = `${e.x - node!.getBoundingClientRect().left}px`;
        gridTemplate[2] = '1fr';
        node!.parentElement!.style.gridTemplateColumns = gridTemplate.join(' ');
    };

    const mouseDown = (e: MouseEvent) => {
        if (e.x >= node!.getBoundingClientRect().left + node!.getBoundingClientRect().width - BORDER_SIZE) {
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
