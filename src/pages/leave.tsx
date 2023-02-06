export default function Leave() {
  return (
    <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Personal Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Use a permanent address where you can receive mail.
        </p>
      </div>
      <div className="space-y-6 sm:space-y-5">
        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
          <label
            htmlFor="first-name"
            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            First name
          </label>
          <div className="mt-1 sm:col-span-2 sm:mt-0">
            <input
              type="text"
              name="first-name"
              id="first-name"
              autoComplete="given-name"
              className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
            />
          </div>
        </div>

        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
          <label
            htmlFor="last-name"
            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            Last name
          </label>
          <div className="mt-1 sm:col-span-2 sm:mt-0">
            <input
              type="text"
              name="last-name"
              id="last-name"
              autoComplete="family-name"
              className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
            />
          </div>
        </div>

        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            Email address
          </label>
          <div className="mt-1 sm:col-span-2 sm:mt-0">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            Country
          </label>
          <div className="mt-1 sm:col-span-2 sm:mt-0">
            <select
              id="country"
              name="country"
              autoComplete="country-name"
              className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
            >
              <option>United States</option>
              <option>Canada</option>
              <option>Mexico</option>
            </select>
          </div>
        </div>

        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
          <label
            htmlFor="street-address"
            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            Street address
          </label>
          <div className="mt-1 sm:col-span-2 sm:mt-0">
            <input
              type="text"
              name="street-address"
              id="street-address"
              autoComplete="street-address"
              className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            City
          </label>
          <div className="mt-1 sm:col-span-2 sm:mt-0">
            <input
              type="text"
              name="city"
              id="city"
              autoComplete="address-level2"
              className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
            />
          </div>
        </div>

        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
          <label
            htmlFor="region"
            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            State / Province
          </label>
          <div className="mt-1 sm:col-span-2 sm:mt-0">
            <input
              type="text"
              name="region"
              id="region"
              autoComplete="address-level1"
              className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
            />
          </div>
        </div>

        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
          <label
            htmlFor="postal-code"
            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            ZIP / Postal code
          </label>
          <div className="mt-1 sm:col-span-2 sm:mt-0">
            <input
              type="text"
              name="postal-code"
              id="postal-code"
              autoComplete="postal-code"
              className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
