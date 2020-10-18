function callAPIMiddleware({ dispatch, getState }) {
  return next => action => {
    const {
      types,
      callAPI,
      shouldCallAPI = () => true,
      payload = {},
      transformData
    } = action

    if (!types) {
      // 普通的 action：把它傳遞下去
      return next(action)
    }

    if (
      !Array.isArray(types) ||
      !types.every(type => typeof type === 'string')
    ) {
      throw new Error('Expected an array of three string types.')
    }

    if (typeof callAPI !== 'function') {
      throw new Error('Expected callAPI to be a function.')
    }

    if (!shouldCallAPI(getState())) {
      return
    }

    const [requestType, successType, failureType] = types;

    dispatch({ ...payload, ...{ type: requestType } });

    return callAPI().then(
      response => {
        const data = transformData ? transformData(response) : response;
        return dispatch({
          ...payload,
          ...{
            data,
            type: successType
          }
        })
      },
      error => dispatch({
        ...payload,
        ...{
          error,
          type: failureType
        }
      })
    )
  }
}

export default callAPIMiddleware;