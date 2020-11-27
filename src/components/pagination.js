import React from 'react'


const Pagination = (props) => {

    const pageNumbers = [];
    let postsPerPage = props.postsPerPage;
    let totalPosts = props.totalPosts;
    const paginate = props.paginate;

    // define page numbers: 
    for(let i = 1; i <= Math.ceil((totalPosts / postsPerPage)); i++){
        pageNumbers.push(i);
    }

    // return pagination nav: 
    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">

                        <a onClick={() => paginate(number)} className='page-link'>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination





