import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './ai-assistant.module.css';

function AIAssistant() {
  const { siteConfig } = useDocusaurusContext();
  
  // Redirect to the AI inference engine
  useEffect(() => {
    // In production, redirect to the AI inference engine
    // In development, show a message with a link
    if (process.env.NODE_ENV === 'production') {
      window.location.href = 'http://localhost:8000';
    }
  }, []);

  return (
    <Layout
      title="AI Assistant"
      description="SQL Learning Path AI Assistant">
      <main className={styles.container}>
        <div className={styles.card}>
          <h1>SQL Learning Path AI Assistant</h1>
          <p>
            The AI Assistant allows you to ask questions about SQL and get answers based on the SQL Learning Path repository.
          </p>
          
          {process.env.NODE_ENV !== 'production' && (
            <div className={styles.devMessage}>
              <p>
                <strong>Development Mode:</strong> In production, you would be automatically redirected to the AI Assistant.
              </p>
              <p>
                Please click the button below to access the AI Assistant:
              </p>
              <Link
                className={styles.button}
                to="http://localhost:8000">
                Go to AI Assistant
              </Link>
            </div>
          )}
          
          <div className={styles.features}>
            <div className={styles.feature}>
              <h3>Natural Language Questions</h3>
              <p>Ask questions in plain English about SQL concepts, syntax, or best practices.</p>
            </div>
            <div className={styles.feature}>
              <h3>Repository-Based Answers</h3>
              <p>Get answers based on the content of the SQL Learning Path repository.</p>
            </div>
            <div className={styles.feature}>
              <h3>Source References</h3>
              <p>See the sources used to generate answers, with links to the relevant documentation.</p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default AIAssistant; 