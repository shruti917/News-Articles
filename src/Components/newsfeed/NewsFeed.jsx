import React from 'react';
import { useNewsContext } from '../../Context/Context';
import NewsCard from '../NewCard/NewsCard';
import './NewsFeed.css';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';


const NewsFeed = () => {
    const { articles, loading, error,currentPage, setCurrentPage, toatlResult } = useNewsContext();

    if (loading) return <Loader/>;
    if (error) return <ErrorMessage message={error}/>;

    return (
        <div className='news-feed'>
            {articles.length === 0 ? (
                <p className='no-news-message'>No news found, please try again.</p>
            ) : (
            
                 <div className='news-grid'>
                    {articles.map((article, index) => (
                        <NewsCard key={index} article={article} />
                    ))}
                </div>
               
            )}
        </div>
    );
};

export default NewsFeed;
