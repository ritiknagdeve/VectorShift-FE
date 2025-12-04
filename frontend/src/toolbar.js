// toolbar.js

import { DraggableNode } from './draggableNode';
import styles from './toolbar.module.css';

export const PipelineToolbar = () => {

    return (
        <div className={styles.toolbar}>
            <div className={styles.nodesContainer}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='api' label='API' />
                <DraggableNode type='filter' label='Filter' />
                <DraggableNode type='database' label='Database' />
                <DraggableNode type='transform' label='Transform' />
                <DraggableNode type='aggregate' label='Aggregate' />
            </div>
        </div>
    );
};
