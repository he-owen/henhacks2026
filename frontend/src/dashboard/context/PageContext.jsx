import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PATH_TO_PAGE = {
  '/': 'Home',
  '/devices': 'Devices',
  '/billing': 'Billing',
  '/optimization': 'Optimization',
  '/tools': 'Tools',
  '/preferences': 'Preferences',
  '/about': 'About',
};

const PAGE_TO_PATH = Object.fromEntries(
  Object.entries(PATH_TO_PAGE).map(([path, page]) => [page, path]),
);

const PageContext = React.createContext({
  currentPage: 'Home',
  setCurrentPage: () => {},
  optimizationResults: null,
  setOptimizationResults: () => {},
  weeklyScheduleResults: null,
  setWeeklyScheduleResults: () => {},
  searchHighlight: null,
  setSearchHighlight: () => {},
  todaySchedule: null,
  setTodaySchedule: () => {},
  savingsSummary: null,
  setSavingsSummary: () => {},
  pendingSchedules: [],
  setPendingSchedules: () => {},
  notificationsOpen: false,
  setNotificationsOpen: () => {},
  notificationCount: null,
  setNotificationCount: () => {},
});

export function PageProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [optimizationResults, setOptimizationResults] = React.useState(null);
  const [weeklyScheduleResults, setWeeklyScheduleResults] = React.useState(null);
  const [searchHighlight, setSearchHighlight] = React.useState(null);
  const [todaySchedule, setTodaySchedule] = React.useState(null);
  const [savingsSummary, setSavingsSummary] = React.useState(null);
  const [pendingSchedules, setPendingSchedules] = React.useState([]);
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const [notificationCount, setNotificationCount] = React.useState(null);

  const currentPage = PATH_TO_PAGE[location.pathname] || 'Home';

  const setCurrentPage = React.useCallback(
    (page) => {
      const path = PAGE_TO_PATH[page] || '/';
      navigate(path);
    },
    [navigate],
  );

  const value = React.useMemo(
    () => ({
      currentPage,
      setCurrentPage,
      optimizationResults,
      setOptimizationResults,
      weeklyScheduleResults,
      setWeeklyScheduleResults,
      searchHighlight,
      setSearchHighlight,
      todaySchedule,
      setTodaySchedule,
      savingsSummary,
      setSavingsSummary,
      pendingSchedules,
      setPendingSchedules,
      notificationsOpen,
      setNotificationsOpen,
      notificationCount,
      setNotificationCount,
    }),
    [currentPage, setCurrentPage, optimizationResults, weeklyScheduleResults, searchHighlight,
     todaySchedule, savingsSummary, pendingSchedules, notificationsOpen, notificationCount],
  );

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
}

export function usePage() {
  return React.useContext(PageContext);
}
