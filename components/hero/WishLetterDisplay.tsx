'use client';
import { ReactFlow, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useNodeFlow } from '@/hooks/useNodeFlow';

export default function WishLetterDisplay({ cardData }: { cardData: any }) {
    const { canvasSize, nodeTypes, nodes, onNodesChange } =
        useNodeFlow(cardData);

    return (
        <div
            style={{ width: canvasSize.width, height: canvasSize.height }}
            className="bg-[#F2F8FF] rounded-2xl p-3"
        >
            <ReactFlow
                nodes={nodes}
                onNodesChange={onNodesChange}
                nodeTypes={nodeTypes}
                proOptions={{ hideAttribution: true }}
            >
                <Background gap={12} size={1} />
            </ReactFlow>
        </div>
    );
}
