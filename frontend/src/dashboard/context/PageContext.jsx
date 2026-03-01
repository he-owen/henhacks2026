import * as React from 'react';

const PageContext = React.createContext({
  currentPage: 'Home',
  setCurrentPage: () => {},
  optimizationResults: null,
  setOptimizationResults: () => {},
  weeklyScheduleResults: null,
  setWeeklyScheduleResults: () => {},
});

export function PageProvider({ children }) {
  const [currentPage, setCurrentPage] = React.useState('Home');
  const [optimizationResults, setOptimizationResults] = React.useState(null);
  const [weeklyScheduleResults, setWeeklyScheduleResults] = React.useState(null);
  const value = React.useMemo(
    () => ({
      currentPage, setCurrentPage,
      optimizationResults, setOptimizationResults,
      weeklyScheduleResults, setWeeklyScheduleResults,
    }),
    [currentPage, optimizationResults, weeklyScheduleResults],
  );
  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
}

export function usePage() {
  return React.useContext(PageContext);
}
