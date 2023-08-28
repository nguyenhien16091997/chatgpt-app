const useApi = () => {
  const fetchData = async <T>(params: {
    data: any;
    successCallbackFn?: (data: T) => void;
    failureCallbackFn?: (e: any) => void;
  }) => {
    const { successCallbackFn, failureCallbackFn, data } = params;
    fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization:
          'Bearer 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',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        const result = res.json() as Promise<T>;
        if (successCallbackFn) successCallbackFn(await result);
      })
      .catch((e) => {
        if (failureCallbackFn) failureCallbackFn(e);
      });
  };

  return { fetchData };
};

export default useApi;
