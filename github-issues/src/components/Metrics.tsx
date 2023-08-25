import { Issue } from "../utils/types";
import { processGitHubIssues } from "../utils";

interface ModalProps {
  issues: Issue[];
}

const Modal = function ({ issues }: ModalProps) {
  const { statusWiseIssueCount, weekStats, averageClosureRate } =
    processGitHubIssues(issues);

  return (
    <div>
      <div className="bg-blue-100 rounded-md px-4 py-3 mb-4 max-w-max">
        <div className="flex gap-20">
          <div className="text-center">
            <div className="font-semibold">Open</div>
            <div>{statusWiseIssueCount["open"]}</div>
          </div>
          <hr className="border border-gray-300 h-10 self-center" />
          <div className="text-center">
            <div className="font-semibold">Closed</div>
            <div>{statusWiseIssueCount["closed"]}</div>
          </div>
        </div>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4">Week</th>
            <th className="py-2 px-4">Total Issues</th>
            <th className="py-2 px-4">Ratio (New Issues vs Closed Issues)</th>
            <th className="py-2 px-4">Closure Rate</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {weekStats.map((week, i: number) => (
            <tr key={"week" + i} className="text-center">
              <td className="py-2 px-4">
                {new Date(week.startDate).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}{" "}
                -
                {new Date(week.endDate).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </td>
              <td className="py-2 px-4">
                {week.newIssues + week.closedIssues}
              </td>
              <td className="py-2 px-4">{week.ratio?.toFixed(2)}</td>
              <td className="py-2 px-4">{week.closureRate?.toFixed(2)}</td>
              {/* Add more table cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="">
        <h2 className="text-right font-semibold text-lg">
          Average Closure Rate: {averageClosureRate.toFixed(2)}
        </h2>
      </div>
    </div>
  );
};

export default Modal;
