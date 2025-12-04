// submit.js

import { motion } from 'framer-motion';
import { useReactFlow } from 'reactflow';
import styles from './submit.module.css';

export const SubmitButton = () => {
    const { getNodes, getEdges } = useReactFlow();

    const handleSubmit = async () => {
        try {
            const nodes = getNodes();
            const edges = getEdges();

            // Format data for backend
            const pipelineData = {
                nodes: nodes.map(node => ({
                    id: node.id,
                    type: node.type,
                    data: node.data
                })),
                edges: edges.map(edge => ({
                    source: edge.source,
                    target: edge.target
                }))
            };

            // Send to backend - Use production URL on Vercel, localhost for development
            const backendUrl = process.env.NODE_ENV === 'production' 
                ? 'https://vectorshift-fe.onrender.com'
                : 'http://localhost:8000';
            const response = await fetch(`${backendUrl}/pipelines/parse`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pipelineData)
            });

            if (!response.ok) {
                throw new Error(`Backend returned ${response.status}`);
            }

            const result = await response.json();

            // Display results
            const isDagSymbol = result.is_dag ? '✓' : '✗';
            const isDagText = result.is_dag ? 'Yes' : 'No';
            alert(
                `Pipeline Analysis:\n\n` +
                `• Nodes: ${result.num_nodes}\n` +
                `• Edges: ${result.num_edges}\n` +
                `• Is DAG: ${isDagSymbol} ${isDagText}`
            );

        } catch (error) {
            console.error('Pipeline submission error:', error);
            alert(
                `Failed to analyze pipeline:\n\n` +
                `${error.message}\n\n` +
                `Make sure the backend is running.`
            );
        }
    };

    return (
        <div className={styles.container}>
            <motion.button 
                type="button"
                className={styles.submitButton}
                onClick={handleSubmit}
                whileHover={{
                    y: -2,
                    boxShadow: "0 6px 16px rgba(124, 58, 237, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                Submit Pipeline
            </motion.button>
        </div>
    );
}
