import { Fragment } from 'react';
import { SfButton, SfIconChevronLeft, SfIconChevronRight } from '@storefront-ui/react';
import classNames from 'classnames';

export function Pagination({totalPages,pages,selectedPage,startPage,endPage,next,prev,setPage,maxVisiblePages}) {
  return (
    <nav
      className="flex mx-auto bottom-4 z-10 bg-green-400 w-2/3 justify-between items-end border-t border-neutral-200 mb-6"
      role="navigation"
      aria-label="pagination"
    >
      <SfButton
        size="lg"
        className="gap-3 !px-3 sm:px-6"
        aria-label="Go to previous page"
        disabled={selectedPage <= 1}
        variant="tertiary"
        slotPrefix={<SfIconChevronLeft />}
        onClick={() => prev()}
      >
        <span className="hidden sm:inline-flex">Previous</span>
      </SfButton>
      <ul className="flex justify-center">
        {!pages.includes(1) && (
          <li>
            <div
              className={classNames('flex pt-1 border-t-4 border-transparent', {
                'font-medium border-t-4 !border-primary-700': selectedPage === 1,
              })}
            >
              <button
                type="button"
                className="min-w-[38px] px-3 sm:px-4 py-3 rounded-md text-neutral-500 md:w-12 hover:bg-primary-100 hover:text-primary-800 active:bg-primary-200 active:text-primary-900"
                aria-current={selectedPage === 1}
                onClick={() => setPage(1)}
              >
                1
              </button>
            </div>
          </li>
        )}
        {startPage > 2 && (
          <li>
            <div className="flex border-t-4 border-transparent">
              <button
                type="button"
                disabled
                aria-hidden="true"
                className="px-3 sm:px-4 py-3 rounded-md text-neutral-500 md:w-12 hover:bg-primary-100 hover:text-primary-800 active:bg-primary-200 active:text-primary-900 "
              >
                ...
              </button>
            </div>
          </li>
        )}
        {pages.map((page) => (
          <Fragment key={page}>
            {maxVisiblePages === 1 && selectedPage === totalPages && (
              <li>
                <div className="flex pt-1 border-t-4 border-transparent">
                  <button
                    type="button"
                    className="min-w-[38px] px-3 sm:px-4 py-3 rounded-md text-neutral-500 md:w-12 hover:bg-primary-100 hover:text-primary-800 active:bg-primary-200 active:text-primary-900 "
                    aria-current={endPage - 1 === selectedPage}
                    onClick={() => setPage(endPage - 1)}
                  >
                    {endPage - 1}
                  </button>
                </div>
              </li>
            )}
            <li>
              <div
                className={classNames('flex pt-1 border-t-4 border-transparent', {
                  'font-medium border-t-4 !border-primary-700': selectedPage === page,
                })}
              >
                <button
                  type="button"
                  className={classNames(
                    'min-w-[38px] px-3 sm:px-4 py-3 text-neutral-500 md:w-12 rounded-md hover:bg-primary-100 hover:text-primary-800 active:bg-primary-200 active:text-primary-900',
                    { '!text-neutral-900 hover:!text-primary-800 active:!text-primary-900': selectedPage === page },
                  )}
                  aria-label={`Page ${page} of ${totalPages}`}
                  aria-current={selectedPage === page}
                  onClick={() => setPage(page)}
                >
                  {page}
                </button>
              </div>
            </li>
            {maxVisiblePages === 1 && selectedPage === 1 && (
              <li>
                <div className="flex pt-1 border-t-4 border-transparent">
                  <button
                    type="button"
                    className="min-w-[38px] px-3 sm:px-4 py-3 rounded-md text-neutral-500 md:w-12 hover:bg-primary-100 hover:text-primary-800 active:bg-primary-200 active:text-primary-900 "
                    aria-current={selectedPage === 1}
                    onClick={() => setPage(2)}
                  >
                    2
                  </button>
                </div>
              </li>
            )}
          </Fragment>
        ))}
        {endPage < totalPages - 1 && (
          <li>
            <div className="flex pt-1 border-t-4 border-transparent">
              <button
                type="button"
                disabled
                aria-hidden="true"
                className="px-3 sm:px-4 py-3 rounded-md text-neutral-500 "
              >
                ...
              </button>
            </div>
          </li>
        )}
        {!pages.includes(totalPages) && (
          <li>
            <div
              className={classNames('flex pt-1 border-t-4 border-transparent', {
                'font-medium border-t-4 !border-primary-700': selectedPage === totalPages,
              })}
            >
              <button
                type="button"
                className="min-w-[38px] px-3 sm:px-4 py-3 rounded-md text-neutral-500 md:w-12 hover:bg-primary-100 hover:text-primary-800 active:bg-primary-200 active:text-primary-900 "
                aria-current={totalPages === selectedPage}
                onClick={() => setPage(totalPages)}
              >
                {totalPages}
              </button>
            </div>
          </li>
        )}
      </ul>
      <SfButton
        size="lg"
        aria-label="Go to next page"
        disabled={selectedPage >= totalPages}
        variant="tertiary"
        slotSuffix={<SfIconChevronRight />}
        className="gap-3 !px-3 sm:px-6"
        onClick={() => next()}
      >
        <span className="hidden sm:inline-flex">Next</span>
      </SfButton>
    </nav>
  );
}
