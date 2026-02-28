import * as React from 'react';

const PageContext = React.createContext({
  currentPage: 'Home',
  setCurrentPage: () => {},
});

export function PageProvider({ children }) {
  const [currentPage, setCurrentPage] = React.useState('Home');
  const value = React.useMemo(
    () => ({ currentPage, setCurrentPage }),
    [currentPage],
  );
  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
}

export function usePage() {
  return React.useContext(PageContext);
}
