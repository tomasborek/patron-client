import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { type FC } from 'react';

interface IProps {
  page: number;
  setPage:
    | React.Dispatch<React.SetStateAction<number>>
    | ((page: number) => void);
  total?: number;
}

const Pagination: FC<IProps> = ({ page, setPage, total }) => {
  const pageBack = () => {
    if (page > 1) setPage(page - 1);
  };
  const pageForward = () => {
    if (!total || (total && page < total)) setPage(page + 1);
  };
  const totalPages = total ? Math.ceil(total / 5) : undefined;
  return (
    <div className="flex w-full items-center justify-center gap-4">
      <button
        className={`rounded-sm border border-gray-200 bg-gray-100 p-4 text-gray-600 ${
          page === 1
            ? 'pointer-events-none cursor-not-allowed opacity-50'
            : 'cursor-pointer'
        }`}
        onClick={() => pageBack()}
      >
        <FontAwesomeIcon icon="chevron-left" />
      </button>
      <p className="font-bold text-gray-600">
        {page} {totalPages ? `/ ${totalPages}` : ''}
      </p>
      <button
        className={`rounded-sm border border-gray-200 bg-gray-100 p-4 text-gray-600 ${
          totalPages && page >= totalPages
            ? 'pointer-events-none cursor-not-allowed opacity-50'
            : 'cursor-pointer'
        }`}
        onClick={() => pageForward()}
      >
        <FontAwesomeIcon icon="chevron-right" />
      </button>
    </div>
  );
};

export default Pagination;
