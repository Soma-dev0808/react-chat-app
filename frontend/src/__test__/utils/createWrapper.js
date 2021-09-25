import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { ApiErrorContext } from "../../common_components/ApiErrorContext/ApiErrorContextProvider";

const createWrapper = () => {
  const route = "/test";
  const history = createMemoryHistory({ initialEntries: [route] });
  const mockApiErrorStatus = {
    isApiLoading: false,
    apiErrorMessage: null,
    redirectPath: null,
  };

  const mockValues = {
    apiErrorStatus: mockApiErrorStatus,
    startOrEndCallApi: jest.fn(),
    setAPIError: jest.fn(),
    clearError: jest.fn(),
  };

  const wrapper = ({ children }) => (
    <Router history={history}>
      <ApiErrorContext.Provider value={mockValues}>
        {children}
      </ApiErrorContext.Provider>
    </Router>
  );

  return { wrapper, mockValues, history };
};

export default createWrapper;
