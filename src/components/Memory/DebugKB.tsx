"use client"

interface KnowledgeUnit {
	cardId: string;
    uid: string;
}

type DebugKBProps = {
    knowledgeBase: KnowledgeUnit[];
}

const DebugKB: React.FC<DebugKBProps> = ({ knowledgeBase }) => {
    const renderKB = () => {
        return <ul>
            {knowledgeBase.map(data => {
                return <li key={data.uid}>{`${data.uid}: ${data.cardId}`}</li>
            })}
        </ul>
    }

    return (
        <div>
            {renderKB()}
        </div>
    );
}

export default DebugKB;