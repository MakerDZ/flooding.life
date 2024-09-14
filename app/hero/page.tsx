'use client';
import React, { useEffect, useState } from 'react';
import {
    ReactFlow,
    useNodesState,
    Background,
    Edge,
    Node,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import CustomNode from './CustomNode';
import { data } from './Card';

const nodeTypes = {
    custom: CustomNode,
};

const GRID_SIZE = 250; // Size of each grid cell
const GRID_WIDTH = 5; // Increase grid width
const GRID_HEIGHT = 10; // Increase grid height
const NODE_WIDTH = 200; // Width of each node
const NODE_HEIGHT = 100; // Height of each node

// Function to generate non-overlapping random positions
const generateRandomPositions = (
    takenPositions: Set<string>
): { x: number; y: number } => {
    let position;
    const buffer = 1; // Buffer to prevent overlap
    const maxAttempts = 100; // Limit attempts to prevent infinite loop
    let attempts = 0;
    do {
        if (attempts++ > maxAttempts) {
            throw new Error('Unable to find a non-overlapping position');
        }
        const x = Math.floor(Math.random() * GRID_WIDTH) * GRID_SIZE;
        const y = Math.floor(Math.random() * GRID_HEIGHT) * GRID_SIZE;
        position = `${x},${y}`;
    } while (
        takenPositions.has(position) ||
        isOverlapping(position, takenPositions)
    );

    takenPositions.add(position); // Mark the position as taken
    const [x, y] = position.split(',').map(Number);
    return { x, y };
};

// Check if the new position overlaps with existing positions
const isOverlapping = (
    position: string,
    takenPositions: Set<string>
): boolean => {
    const [newX, newY] = position.split(',').map(Number);
    for (let pos of Array.from(takenPositions)) {
        const [x, y] = pos.split(',').map(Number);
        if (
            Math.abs(newX - x) < NODE_WIDTH &&
            Math.abs(newY - y) < NODE_HEIGHT
        ) {
            return true;
        }
    }
    return false;
};

// Function to select a subset of nodes and assign random positions
const selectRandomNodes = (nodes: Node[], count: number) => {
    const shuffledNodes = [...nodes].sort(() => 0.5 - Math.random());
    const selectedNodes = shuffledNodes.slice(0, count);

    const takenPositions = new Set<string>();

    return selectedNodes.map((node) => ({
        ...node,
        position: generateRandomPositions(takenPositions),
    }));
};

const initialEdges: Edge[] = [];

export default function Hero() {
    const [nodes, setNodes, onNodesChange] = useNodesState(
        selectRandomNodes(data, 15)
    );
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        setNodes(selectRandomNodes(data, 15));
    }, []);

    if (!isClient) {
        return (
            <div className="w-full h-full bg-[#F2F8FF] rounded-2xl p-3"></div>
        );
    }

    return (
        <div className="w-full h-full bg-[#F2F8FF] rounded-2xl p-3">
            <ReactFlow
                nodes={nodes}
                edges={initialEdges}
                onNodesChange={onNodesChange}
                nodeTypes={nodeTypes}
                fitView
            >
                <Background gap={12} size={1} />
            </ReactFlow>
        </div>
    );
}
