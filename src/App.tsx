import React, { useState } from "react";
import { DynamicTable } from "./components/DynamicTable";
import { useFetch } from "./hooks/useFetch";
import { RefreshCw, Search } from "lucide-react";

interface FilterParams {
  Id?: string;
  UserId?: string;
  product?: string;
}

function App() {
  const [endpoint, setEndpoint] = useState(
    "https://jsonplaceholder.typicode.com/users"
  );
  const [filters, setFilters] = useState<FilterParams>({});
  const [selectedField, setSelectedField] = useState("KPIData_keyword");

  const { data, isLoading, error, refetch } = useFetch<any[]>(
    endpoint,
    filters,
    selectedField
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newFilters: FilterParams = {};
    const newEndpoint = formData.get("endpoint")?.toString() || endpoint;

    const Id = formData.get("Id")?.toString();
    const UserId = formData.get("UserId")?.toString();
    const product = formData.get("product")?.toString();
    const selectedKey = formData.get("selectedField")?.toString();

    if (Id) newFilters.Id = Id;
    if (UserId) newFilters.UserId = UserId;
    if (product) newFilters.product = product;
    if (selectedKey) setSelectedField(selectedKey);

    setEndpoint(newEndpoint);
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dynamic Table</h1>
            <p className="mt-2 text-sm text-gray-700">
              Filter and view data from any API endpoint
            </p>
          </div>
          <button
            onClick={refetch}
            className="mt-4 inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:mt-0"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Data
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {/* Endpoint Selection */}
          <div>
            <label
              htmlFor="endpoint"
              className="block text-sm font-medium text-gray-700"
            >
              Select Endpoint
            </label>
            <select
              name="endpoint"
              id="endpoint"
              defaultValue={endpoint}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            >
              <option value="https://s25qbaqr5d.execute-api.us-east-2.amazonaws.com/Dev/OrganicPages">
                {" "}
                https://s25qbaqr5d.execute-api.us-east-2.amazonaws.com/Dev/OrganicPages(Top
                Pages Function)
              </option>
              <option value="https://s25qbaqr5d.execute-api.us-east-2.amazonaws.com/Dev/Keyword_Profile">
                https://s25qbaqr5d.execute-api.us-east-2.amazonaws.com/Dev/Keyword_Profile(Keyword
                Profile Function)
              </option>
              <option value="https://s25qbaqr5d.execute-api.us-east-2.amazonaws.com/Dev/technical_audit">
                https://s25qbaqr5d.execute-api.us-east-2.amazonaws.com/Dev/technical_audit(Custom
                technical Audit)
              </option>
              <option value="https://s25qbaqr5d.execute-api.us-east-2.amazonaws.com/Dev/Backlinks_Profile2">
                https://s25qbaqr5d.execute-api.us-east-2.amazonaws.com/Dev/Backlinks_Profile2(Backlinks
                Profile)
              </option>
              <option value="https://s25qbaqr5d.execute-api.us-east-2.amazonaws.com/Dev/Backlinks_Profile">
                https://s25qbaqr5d.execute-api.us-east-2.amazonaws.com/Dev/Backlinks_Profile(SERP)
              </option>
              <option value="https://s25qbaqr5d.execute-api.us-east-2.amazonaws.com/Dev/top_competitors">
                https://s25qbaqr5d.execute-api.us-east-2.amazonaws.com/Dev/top_competitors(Top
                Competitors)
              </option>
              <option value="https://s25qbaqr5d.execute-api.us-east-2.amazonaws.com/Dev/Traffic_by_Country">
                https://s25qbaqr5d.execute-api.us-east-2.amazonaws.com/Dev/Traffic_by_Country(Traffic_by_Country)
              </option>

              <option value="https://5v82xiqowe.execute-api.us-east-2.amazonaws.com/Prod/identify ">
                https://5v82xiqowe.execute-api.us-east-2.amazonaws.com/Prod/identify
                (Content Audit)
              </option>
              <option value="https://s25qbaqr5d.execute-api.us-east-2.amazonaws.com/Dev/Traffic_by_Country">
                https://s25qbaqr5d.execute-api.us-east-2.amazonaws.com/Dev/Traffic_by_Country(Traffic_by_Country)
              </option>
              <option value="https://s25qbaqr5d.execute-api.us-east-2.amazonaws.com/Dev/Traffic_by_Country">
                https://s25qbaqr5d.execute-api.us-east-2.amazonaws.com/Dev/Traffic_by_Country(Traffic_by_Country)
              </option>
              <option value="3">Endpoint 3</option>
              <option value="4">Endpoint 4</option>
            </select>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* ID Selection */}
            <div>
              <label
                htmlFor="Id"
                className="block text-sm font-medium text-gray-700"
              >
                Select ID
              </label>
              <select
                name="Id"
                id="Id"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Dont Select any ID</option>
                <option value="1">Dont Select any ID</option>
                <option value="2">Dont Select any ID</option>
                <option value="3">Dont Select any ID</option>
                <option value="4">Dont Select any ID</option>
              </select>
            </div>

            {/* User ID Selection */}
            <div>
              <label
                htmlFor="UserId"
                className="block text-sm font-medium text-gray-700"
              >
                Select User ID
              </label>
              <select
                name="UserId"
                id="UserId"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="Taofeek">Taofeek</option>
                <option value="101">User ID 101</option>
                <option value="102">User ID 102</option>
                <option value="103">User ID 103</option>
                <option value="104">User ID 104</option>
              </select>
            </div>

            {/* Product Selection */}
            <div>
              <label
                htmlFor="product"
                className="block text-sm font-medium text-gray-700"
              >
                Select Product
              </label>
              <select
                name="product"
                id="product"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="Website Analysis">Website Analysis</option>
                <option value="Technical Audit">Technical Audit</option>
                <option value="ProductB">Product B</option>
                <option value="ProductC">Product C</option>
                <option value="ProductD">Product D</option>
              </select>
            </div>

            {/* Data Field Selection */}
            <div>
              <label
                htmlFor="selectedField"
                className="block text-sm font-medium text-gray-700"
              >
                Select Data Field
              </label>
              <select
                name="selectedField"
                id="selectedField"
                value={selectedField}
                onChange={(e) => setSelectedField(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="KPIData_keyword">
                  Keyword Profile Function
                </option>
                <option value="KPIData_Traffic">
                  Traffic By Country Function
                </option>
                <option value="KPIData_Backlinks">SERP Function</option>
                <option value="KPIData_Backlinks2">Backlinks Function</option>
                <option value="KPIData_TopPages">Top Pages</option>
                <option value="KPIData_Audit">Custom Technical Audit</option>
                <option value="KPIData_Competitors">Top Competitors</option>
                <option value="ContentAudit">Content Audit</option>

                <option value="other_field">Other Field</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              <Search className="mr-2 h-4 w-4" />
              Search
            </button>
          </div>
        </form>

        <div className="mt-8">
          <DynamicTable data={data || []} isLoading={isLoading} error={error} />
        </div>
      </div>
    </div>
  );
}

export default App;
