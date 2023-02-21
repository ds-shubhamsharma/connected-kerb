import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import * as React from 'react';

interface viewMoreProps {
  className: string,
  idName: string,
  buttonLabel: string,
}
export default function ViewMore(props: viewMoreProps): JSX.Element | null {
  const { className, idName, buttonLabel } = props;  
  const searchAction = useSearchActions();
  
  const offset = useSearchState(state => state.vertical.offset) || 0;
  const limit = useSearchState(state => state.vertical.limit) || 10;
  const numResults = useSearchState(state => state.vertical.resultsCount) || 0;
  const [inputvalue, setInputValue] = React.useState("");
  const executeSearchWithNewOffset = (newOffset: number) => {
    searchAction.setOffset(newOffset);
    searchAction.executeVerticalQuery();
  }

  const maxPageCount = Math.ceil(numResults / limit);
  if (maxPageCount <= 1) {
    return null;
  }
  const pageNumber = (offset / limit) + 1;
  
  return (
    <>
    <div>
      {pageNumber !== maxPageCount ?<div className=" mx-auto mt-2 w-52 ">
              <button style={{backgroundColor:"#314448"}} className={className} id={idName} onClick={() => executeSearchWithNewOffset(offset + limit)}>{buttonLabel}</button>
          </div>:""}
    </div>
    </>
  );
}
