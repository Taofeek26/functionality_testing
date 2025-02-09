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
  const [selectedField, setSelectedField] = useState("KPIData_keyword"); // Default selected field

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
    const selectedKey = formData.get("selectedField")?.toString(); // Get the selected key

    if (Id) newFilters.Id = Id;
    if (UserId) newFilters.UserId = UserId;
    if (product) newFilters.product = product;
    if (selectedKey) setSelectedField(selectedKey); // Update selected field

    console.log(Id);
    console.log(UserId);
    console.log(product);
    console.log("Selected Field:", selectedKey);

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
          <div>
            <label
              htmlFor="endpoint"
              className="block text-sm font-medium text-gray-700"
            >
              API Endpoint
            </label>
            <input
              type="url"
              name="endpoint"
              id="endpoint"
              defaultValue={endpoint}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter API endpoint URL"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="id"
                className="block text-sm font-medium text-gray-700"
              >
                ID
              </label>
              <input
                type="text"
                name="Id"
                id="Id"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter ID"
                min="1"
              />
            </div>
            <div>
              <label
                htmlFor="userId"
                className="block text-sm font-medium text-gray-700"
              >
                User ID
              </label>
              <input
                type="text"
                name="UserId"
                id="UserId"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter User ID"
                min="1"
              />
            </div>
            <div>
              <label
                htmlFor="userId"
                className="block text-sm font-medium text-gray-700"
              >
                Product
              </label>
              <input
                type="text"
                name="product"
                id="product"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter Product"
                min="1"
              />
            </div>
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
                <option value="KPIData_keyword">Keword Profile Function</option>
                <option value="KPIData_Traffic">
                  Traffic By Country Fucntion
                </option>
                <option value="KPIData_Backlinks">SERP Function</option>
                <option value="KPIData_Backlinks2">Backlinks Function</option>
                <option value="KPIData_TopPages">Top Pages</option>
                <option value="KPIData_Audit">Custom Technical Audit</option>
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
