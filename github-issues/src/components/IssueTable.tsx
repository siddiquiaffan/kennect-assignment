import React from "react";

const IssueTable = ({ issues }: any) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="w-full">
      <div className="w-full flex justify-center items-center">
        <button
          className="mt-4 mc-auto bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setOpen(true)}
        >
          View All Issues
        </button>
      </div>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
          <div className="bg-white w-10/12 h-[90%] p-4 rounded shadow-lg overflow-y-auto">
            <div className="h-[10%] flex justify-between pb-5">
              <h2 className="text-xl font-semibold">List of Issues</h2>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded"
                onClick={() => setOpen(false)}
              >
                Close Modal
              </button>
            </div>
            <div className="h-[90%] overflow-auto">
              <table className="w-full border-collapse border border-gray-300 overflow-y-auto">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4">Issue Number</th>
                    <th className="py-2 px-4">Title</th>
                    <th className="py-2 px-4">Created</th>
                    <th className="py-2 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {issues.map((issue: any) => (
                    <tr key={issue.id} className="border-t border-gray-300">
                      <td className="py-2 px-4">{issue.number}</td>
                      <td className="py-2 px-4">{issue.title}</td>
                      <td className="py-2 px-4">
                        {new Date(issue.created_at).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </td>
                      <td className="py-2 px-4">
                        <span
                          className={`${
                            issue.state === "open"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {issue.state}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueTable;
