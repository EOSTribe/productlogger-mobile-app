const API_BASE_URL = 'http://newaccount.productlogger.eostribe.io/accounts';

export const register = async params => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(params),
  };
  try {
    const response = await fetch(`${API_BASE_URL}`, options);
    const responseJson = await response.json();
    if (response.status === 200) {
      return responseJson;
    }
    return {
      error: true,
      status: response.status,
      err: responseJson,
    };
  } catch (err) {
    return {
      error: true,
      msg: 'Network error',
      err,
    };
  }
};
