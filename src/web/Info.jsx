import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async";
import { marked } from 'marked';
import Header from "./Header";
import './css/style.css';

const Info = () => {
    const [activeTab, setActiveTab] = useState('rules');
    const [content, setContent] = useState('');
    const [key, setKey] = useState(0);

    useEffect(() => {
        const fetchContent = async () => {
            let file = '';
      if (activeTab === 'rules') file = '/md/rule.md';
      else if (activeTab === 'connect') file = '/md/howto.md';
      else if (activeTab === 'info') file = '/md/info.md';

            const response = await fetch(file);
            const text = await response.text();
            setContent(marked(text));

            setKey((prevKey) => prevKey + 1);
        }
        fetchContent();
    }, [activeTab]);

    return (
        <>
            <Helmet>
                <title>info page</title>
                <meta property="og:title" content="info page" />
            </Helmet>

            <Header activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="info-page">
                <div className="tabs">
                  <button className={activeTab === 'rules' ? 'active' : ''} onClick={() => setActiveTab('rules')}>rules</button>
                  <button className={activeTab === 'connect' ? 'active' : ''} onClick={() => setActiveTab('connect')}>howto</button>
                  <button className={activeTab === 'info' ? 'active' : ''} onClick={() => setActiveTab('info')}>info</button>
                </div>
        
                <div className={`wiki-body fadeInLeft`} key={key}>
                  <div className="wiki-content" dangerouslySetInnerHTML={{ __html: content }} />
                </div>
            </div>
        </>
    );
}

export default Info;