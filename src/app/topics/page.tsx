import React, { useEffect, useState } from 'react'
import Card from '../components/common/Card'
import { useTopics } from '../utils/hooks/useTopics'

const TopicsPage = () => {
    const { getTopics } = useTopics();
    const [topicsData, setTopicsData] = useState<any>([]);
    const handleGetTopics = async () => {
        const topics = await getTopics({});
        setTopicsData(topics);
    }
    useEffect(() => {
        handleGetTopics();
    }, []);
  return (
    <Card>
      {topicsData.map(({ topic, index}: {topic: any, index: number}) => <div key={index}>{topic}</div>)}
    </Card>
  );
}

export default TopicsPage;