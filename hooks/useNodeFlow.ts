import WishCard from '@/components/hero/WishCard';
import { useNodesState } from '@xyflow/react';
import { useEffect, useState } from 'react';

const nodeTypes = {
    custom: WishCard,
};

const NODE_WIDTH = 255;
const NODE_HEIGHT = 122;
const PADDING = 50;
const SPACING_FACTOR = 1.5;
const ROTATION_LIMIT = 15;

const calculateCanvasSize = (nodeCount: number) => {
    const aspectRatio = 16 / 9;
    const totalArea =
        nodeCount *
        NODE_WIDTH *
        NODE_HEIGHT *
        Math.pow(SPACING_FACTOR, 2) *
        1.5;
    const canvasHeight = Math.sqrt(totalArea / aspectRatio);
    const canvasWidth = canvasHeight * aspectRatio;
    return {
        width: Math.ceil(canvasWidth) + PADDING * 2,
        height: Math.ceil(canvasHeight) + PADDING * 2,
    };
};

const doNodesOverlap = (node1: any, node2: any) => {
    return (
        node1.x < node2.x + NODE_WIDTH &&
        node1.x + NODE_WIDTH > node2.x &&
        node1.y < node2.y + NODE_HEIGHT &&
        node1.y + NODE_HEIGHT > node2.y
    );
};

const resolveCollisions = (
    nodes: any,
    canvasWidth: number,
    canvasHeight: number
) => {
    const resolvedNodes = [...nodes];
    let hasCollision;

    do {
        hasCollision = false;
        for (let i = 0; i < resolvedNodes.length; i++) {
            for (let j = i + 1; j < resolvedNodes.length; j++) {
                if (doNodesOverlap(resolvedNodes[i], resolvedNodes[j])) {
                    hasCollision = true;
                    const dx = resolvedNodes[j].x - resolvedNodes[i].x;
                    const dy = resolvedNodes[j].y - resolvedNodes[i].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const minDistance =
                        Math.sqrt(
                            NODE_WIDTH * NODE_WIDTH + NODE_HEIGHT * NODE_HEIGHT
                        ) * SPACING_FACTOR;

                    if (distance < minDistance) {
                        const angle = Math.atan2(dy, dx);
                        const pushDistance = (minDistance - distance) / 2;

                        resolvedNodes[i].x -= Math.cos(angle) * pushDistance;
                        resolvedNodes[i].y -= Math.sin(angle) * pushDistance;
                        resolvedNodes[j].x += Math.cos(angle) * pushDistance;
                        resolvedNodes[j].y += Math.sin(angle) * pushDistance;
                    }
                }
            }
        }

        resolvedNodes.forEach((node) => {
            node.x = Math.max(
                PADDING,
                Math.min(canvasWidth - NODE_WIDTH - PADDING, node.x)
            );
            node.y = Math.max(
                PADDING,
                Math.min(canvasHeight - NODE_HEIGHT - PADDING, node.y)
            );
        });
    } while (hasCollision);

    return resolvedNodes;
};

const generateMessyPositions = (
    count: number,
    canvasWidth: number,
    canvasHeight: number
) => {
    const positions = [];

    for (let i = 0; i < count; i++) {
        positions.push({
            x:
                Math.random() * (canvasWidth - NODE_WIDTH - PADDING * 2) +
                PADDING,
            y:
                Math.random() * (canvasHeight - NODE_HEIGHT - PADDING * 2) +
                PADDING,
            rotate: Math.random() * (ROTATION_LIMIT * 2) - ROTATION_LIMIT,
        });
    }

    return resolveCollisions(positions, canvasWidth, canvasHeight);
};

const createNodes = (nodes: any, canvasWidth: number, canvasHeight: number) => {
    const positions = generateMessyPositions(
        nodes.length,
        canvasWidth,
        canvasHeight
    );

    return nodes.map((node: any, index: any) => ({
        ...node,
        type: 'custom',
        position: { x: positions[index].x, y: positions[index].y },
        data: {
            ...node.data,
            rotate: positions[index].rotate,
        },
    }));
};

export const useNodeFlow = (data: any) => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [canvasSize, setCanvasSize] = useState({ width: 1000, height: 1000 });
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const size = calculateCanvasSize(data.length);
        setCanvasSize(size);
        const initialNodes = createNodes(data, size.width, size.height);
        setNodes(initialNodes);
    }, []);

    return {
        isClient,
        canvasSize,
        nodes,
        nodeTypes,
        onNodesChange,
    };
};
