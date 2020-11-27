import React from 'react'


const Pagination = ({postsperPage, totalPosts}) => {

    const pageNumbers = [];

    // define page numbers: 
    for(let i = 1; i < Math.ceil(totalPosts / postsperPage); i++){
        pageNumbers.push(i);
    }

    // return pagination nav: 
    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">

                        <a href="!#" className='page-link'>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination





