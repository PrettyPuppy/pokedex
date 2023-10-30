import { memo, useState } from 'react';

interface SearchNodeProps {
    data: {
        onChange: Function,
        width: number;
        height: number;
    };
    selected: boolean;
}

const SearchNode : React.FC<SearchNodeProps> = ({ data }) => {
  const [keyword, setKeyword] = useState('');

  const handleClick = () => {
    data.onChange(keyword);
  }
  
  return (
    <>
        <div className='custom-drag-handle' style={{width: '100%', height:'100%', position:'absolute', backgroundColor: 'rgba(255,255,255,0.00)', textAlign: 'center'}}>
            <input type='text' value={keyword} onChange={(e) => {setKeyword(e.target.value)}} style={{height: '30%', width: '85%', fontSize: '30px', marginTop: '15px'}} />
            <button style={{width: '200px', height: '60px', backgroundColor: 'rgb(10, 100, 50)', color: 'white', fontSize: '30px', marginTop: '30px'}} onClick={handleClick}>
                Search
            </button>
        </div>
    </>
  );
};

export default memo(SearchNode);
