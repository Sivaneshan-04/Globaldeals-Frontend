'use client'
import { useState, useRef } from 'react';
import { useDebounce } from 'react-use';
import { offset } from '@floating-ui/react-dom';
import {
  SfButton,
  SfInput,
  SfIconSearch,
  SfIconCancel,
  useDisclosure,
  SfListItem,
  SfLoaderCircular,
  useTrapFocus,
  useDropdown,
  SfIconGridView,
} from '@storefront-ui/react';

const mockProducts = [
  { id: 'j-avatar', name: 'jack', image: 'https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/kid.png' },
  { id: 'j-cat', name: 'jackets', thumbnail: <SfIconGridView /> },
  { id: 'j-wom', name: 'jacket women', thumbnail: <SfIconSearch /> },
  { id: 'j-den', name: 'jacket denim', thumbnail: <SfIconSearch /> },
  { id: 'j-dre', name: 'jacket dress', thumbnail: <SfIconSearch /> },
  { id: 'dr-cat', name: 'dresses', thumbnail: <SfIconGridView /> },
  { id: 'dr-cot', name: 'cotton dresses', thumbnail: <SfIconSearch /> },
  { id: 'dr-wom', name: 'dresses women', thumbnail: <SfIconSearch /> },
  { id: 'dr-sum', name: 'summer dresses', thumbnail: <SfIconSearch /> },
];

// Just for presentation purposes. Replace mock request with the actual API call.
// eslint-disable-next-line no-promise-executor-return
const delay = () => new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));

const mockAutocompleteRequest = async (phrase) => {
  await delay();
  const results = mockProducts
    .filter((product) => product.name.toLowerCase().startsWith(phrase.toLowerCase()))
    .map((product) => {
      const highlight = product.name.substring(0, phrase.length);
      const rest = product.name.substring(phrase.length);
      return { highlight, rest, product };
    });
  return results;
};

export default function Search() {
  const inputRef = useRef(null);
  const dropdownListRef = useRef(null);
  const [searchValue, setSearchValue] = useState('');
  const [isLoadingSnippets, setIsLoadingSnippets] = useState(false);
  const [snippets, setSnippets] = useState([]);
  const { isOpen, close, open } = useDisclosure();
  const { refs, style } = useDropdown({
    isOpen,
    onClose: close,
    placement: 'bottom-start',
    middleware: [offset(4)],
  });
  const { focusables: focusableElements, updateFocusableElements } = useTrapFocus(dropdownListRef, {
    trapTabs: false,
    arrowKeysUpDown: true,
    activeState: isOpen,
    initialFocus: false,
  });
  const isResetButton = Boolean(searchValue);
  const handleSubmit = (event) => {
    event.preventDefault();
    close();
    alert(`Search for phrase: ${searchValue}`);
  };

  const handleFocusInput = () => {
    inputRef.current?.focus();
  };

  const handleReset = () => {
    setSearchValue('');
    setSnippets([]);
    close();
    handleFocusInput();
  };

  const handleChange = (event) => {
    const phrase = event.target.value;
    if (phrase) {
      setSearchValue(phrase);
    } else {
      handleReset();
    }
  };

  const handleSelect = (phrase) => () => {
    setSearchValue(phrase)
    close();
    handleFocusInput();
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Escape') handleReset();
    if (event.key === 'ArrowUp') {
      open();
      updateFocusableElements();
      if (isOpen && focusableElements.length > 0) {
        focusableElements[focusableElements.length - 1].focus();
      }
    }
    if (event.key === 'ArrowDown') {
      open();
      updateFocusableElements();
      if (isOpen && focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }
  };

  useDebounce(
    () => {
      if (searchValue) {
        const getSnippets = async () => {
          open();
          setIsLoadingSnippets(true);
          try {
            const data = await mockAutocompleteRequest(searchValue);
            setSnippets(data);
          } catch (error) {
            close();
            console.error(error);
          }
          setIsLoadingSnippets(false);
        };

        getSnippets();
      }
    },
    500,
    [searchValue],
  );

  return (
    <form role="search" onSubmit={handleSubmit} ref={refs.setReference} className="relative w-1/3">
      <div className="flex">
        <SfInput
          ref={inputRef}
          value={searchValue}
          onChange={handleChange}
          onFocus={open}
          wrapperClassName="w-full !ring-0 active:!ring-0 hover:!ring-0 focus-within:!ring-0 border-y border-l border-neutral-200 rounded-r-none hover:border-primary-800 active:border-primary-700 active:border-y-2 active:border-l-2 focus-within:border-y-2 focus-within:border-l-2 focus-within:border-primary-700"
          aria-label="Search"
          placeholder="Search 'jackets' or 'dresses'..."
          onKeyDown={handleInputKeyDown}
          slotPrefix={<SfIconSearch />}
          slotSuffix={
            isResetButton && (
              <button
                type="reset"
                onClick={handleReset}
                aria-label="Reset search"
                className="flex rounded-md focus-visible:outline focus-visible:outline-offset"
              >
                <SfIconCancel />
              </button>
            )
          }
        />
        <SfButton type="submit" className="rounded-l-none">
          Search
        </SfButton>
      </div>

      {isOpen && (
        <div ref={refs.setFloating} style={style} className="left-0 z-10 right-0">
          {isLoadingSnippets ? (
            <div className="flex items-center justify-center bg-white w-full h-screen sm:h-20 py-2 sm:border sm:border-solid sm:rounded-md sm:border-neutral-100 sm:drop-shadow-md">
              <SfLoaderCircular />
            </div>
          ) : (
            snippets.length > 0 && (
              <ul
                ref={dropdownListRef}
                className="py-2 bg-white sm:border border-solid sm:rounded-md sm:border-neutral-100 sm:drop-shadow-md"
              >
                {snippets.map(({ highlight, rest, product }) => (
                  <li key={product.id}>
                    <SfListItem
                      as="button"
                      type="button"
                      onClick={handleSelect(product.name)}
                      className="!py-4 sm:!py-2 flex justify-start"
                    >
                      <p className="flex items-center text-left text-neutral-500">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="rounded-sm" width="24" height="24" />
                        ) : (
                          product.thumbnail
                        )}
                        <span className="ml-2 text-neutral-900">{highlight}</span>
                        <span className="font-medium text-neutral-900">{rest}</span>
                      </p>
                    </SfListItem>
                  </li>
                ))}
              </ul>
            )
          )}
        </div>
      )}
    </form>
  );
}