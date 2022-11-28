import { useState, useEffect } from "react";
import "./App.css";

import ReactPaginate from "react-paginate";

export default function Memes({ memes }) {
  console.log("result Memes = ", memes.data.memes);
  //   const [currentItems, setCurrentItems] = useState([]);
  //   const [pageCount, setPageCount] = useState(0);
  //   const [itemOffset, setItemOffset] = useState(0);
  //   const itemsPerPage = 5;

  //   useEffect(() => {
  //     const endOffset = itemOffset + itemsPerPage;
  //     setCurrentItems(memes.data.memes.slice(itemOffset, endOffset));
  //     setPageCount(Math.ceil(memes.data.memes.length / itemsPerPage));
  //   }, [itemOffset, itemsPerPage, memes.data.memes]);

  //   const handlePageClick = (event) => {
  //     const newOffset = (event.selected * itemsPerPage) % memes.data.memes.length;
  //     setItemOffset(newOffset);
  //   };

  return (
    <div>
      {/* <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        pageCount={pageCount}
        previousLabel="<<"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="active"
      /> */}
      <ul className="searchResults">
        {memes.data.memes &&
          memes.data.memes.map((items) => (
            <div>
              {items.name}
              <li>
                {" "}
                <div className="articletitle">
                  <img
                    src={items.url}
                    alt={items.name}
                    width="200px"
                    height="200px"
                  />
                </div>
              </li>
            </div>
          ))}
      </ul>
    </div>
  );
}
