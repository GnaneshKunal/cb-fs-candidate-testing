import { useState } from 'react';

export default function TypeSection(props) {
  const { name, data, onClick, selected } = props;

  const [showMore, setShowMore] = useState(false);

  const sortedData = data.sort((a, b) => a.doc_count < b.doc_count);

  return (
    <div className='bg-white shadow m-3 p-2'>
      <h3 className='pt-1 pb-1'><b>{name.toUpperCase()}</b></h3>
      <ul>
        {
          sortedData.slice(0, 10).map(type => {
            return (
              <li onClick={() => onClick(type.key)} className={`pt-1 pb-1 text-sm cursor-pointer ${selected === type.key ? 'font-bold' : ''}`} key={type.key}>
                {type.key} <span className="text-gray-400">{type.doc_count}</span>
              </li>
            );
          })
        }
        {
          sortedData.length > 10 ?
            showMore ?
            sortedData.slice(10, sortedData.length).map(type => <li onClick={() => onClick(type.key)} className={`pt-1 pb-1 text-sm cursor-pointer ${selected === type.key ? 'font-bold' : ''}`} key={type.key}>{type.key} <span className="text-gray-400">{type.doc_count}</span></li>)
          :
          <li className='pt-1 pb-1 text-blue-600' onClick={() => setShowMore(true)}>Show more</li>
          :
          null
        }
      </ul>
    </div>
  );
}
