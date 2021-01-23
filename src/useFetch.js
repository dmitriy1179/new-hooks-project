import React from "react" 

const Spinner = () => {
  return (
    <div className="spinner-border mt-3" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
};

const StatusResolver = ({status, noData, children}) => {
  if (status === "pending") {
    return <Spinner />;
  }
  if (noData) {
    return <span className="text-info">No data</span>;
  }
  if (status === "rejected") {
    return <span className="text-danger">Something went wrong</span>;
  }
  if (status === "idle") {
    return null;
  }
  if (status === "resolved") {
    return children;
  }
};

StatusResolver.defaultProps = {
  noData: false,
};

const useFetch = (url, fetchParams = {}) => {
  const [data, setData] = React.useState(null);
  const [status, setStatus] = React.useState("idle");
  const fetchRequest = async () => {
    try {
      setStatus("pending");
      const jsonData = await fetch(url, fetchParams = {});
      if (!jsonData.ok) {
        setStatus("rejected")
        throw new Error(jsonData.statusText)
      }
      const fetchData = await jsonData.json()
      setData(fetchData)
      setStatus("resolved");
    } catch(e) {
      console.log(e)
      setData(null)
      setStatus("rejected");
    }
  }

  React.useEffect(() => {
    fetchRequest()
  }, [url])

  return [data, status]
}

const FetchComponent = () => {
  const [value, setValue] = React.useState(5)
  const [data, status] = useFetch(`https://www.reddit.com/r/reactjs.json?limit=${value}&dist=${value}`);

  const onChangeSelect = (e) => {
    setValue(e.target.value)
  }
  console.log("value", value)
  console.log("data", data)
  console.log("status", status)

  return (
    <>
      <div className="row input-group d-flex justify-content-center m-3 mx-auto w-50">
        <label className="col-4 col-form-label px-0">Select the number of users</label>
        <div className="col-2 p-0">
          <select
            className="form-control"
            onChange={onChangeSelect}
            defaultValue={5}
            name="select">
              <option key={5}  value={5}>5</option>
              <option key={10} value={10}>10</option>
              <option key={15} value={15}>15</option>
              <option key={20} value={20}>20</option>
          </select>
        </div>
      </div>
      <StatusResolver
        noData={data !== null && data.length === 0}
        status={status}
      >
        <div>OK!</div>
      </StatusResolver>  
    </>
  )
}

export default FetchComponent