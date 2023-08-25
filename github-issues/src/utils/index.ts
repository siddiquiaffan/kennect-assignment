interface Issue {
    id: number;
    created_at: string;
    closed_at: string | null;
    state: 'open' | 'closed';
}

interface WeekStats {
    startDate: Date;
    endDate: Date;
    newIssues: number;
    closedIssues: number;
    closureRate?: number;
    ratio?: number;
}

interface ReturnType {
    statusWiseIssueCount: {
        open: number;
        closed: number;
    };
    weekStats: (WeekStats & { closureRate: number; ratio: number })[];
    averageClosureRate: number;
}

export function processGitHubIssues(issues: Issue[]) {
    const statusWiseIssueCount = {} as ReturnType['statusWiseIssueCount'];
    const weekStats: WeekStats[] = [];

    const today = new Date();
    const tenWeeksAgo = new Date(today);
    tenWeeksAgo.setDate(today.getDate() - 70); // 10 weeks * 7 days/week = 70 days

    for (const issue of issues) {
        // Status wise issue count
        statusWiseIssueCount[issue.state] = (statusWiseIssueCount[issue.state] || 0) + 1;

        const createdAt = new Date(issue.created_at);
        if (createdAt >= tenWeeksAgo) {
            // Week wise issue count
            const weekIndex = Math.floor(((today as any) - (createdAt as any)) / (7 * 24 * 60 * 60 * 1000));
            if (!weekStats[weekIndex]) {
                const startDate = new Date(createdAt);
                startDate.setHours(0, 0, 0, 0);
                const endDate = new Date(startDate);
                endDate.setDate(startDate.getDate() + 7);
                endDate.setHours(23, 59, 59, 999);
                weekStats[weekIndex] = {
                    startDate,
                    endDate,
                    newIssues: 0,
                    closedIssues: 0,
                };
            }

            weekStats[weekIndex].newIssues++;

            if (issue.state === 'closed' && issue.closed_at) {
                const closedAt = new Date(issue.closed_at);
                if (closedAt >= weekStats[weekIndex].startDate && closedAt <= weekStats[weekIndex].endDate) {
                    weekStats[weekIndex].closedIssues++;
                }
            }
        }
    }

    let totalClosureRate = 0;
    let closureRateCount = 0;

    for (const week of weekStats) {
        // Ratio of new issues vs closed issues per week
        const ratio = week.closedIssues === 0 ? 0 : week.newIssues / week.closedIssues;

        // Weekly Closure Rate
        const closureRate =
            (week.closedIssues || 0) /
            (week.closedIssues + (weekStats[weekStats.indexOf(week) - 1]?.newIssues || 0));

        if (!isNaN(closureRate)) {
            totalClosureRate += closureRate;
            closureRateCount++;
        }

        // add ratio and closureRate to weekStats
        Object.assign(week, { ratio, closureRate });
    }

    // Average Weekly Closure Rate
    const averageClosureRate = closureRateCount === 0 ? 0 : totalClosureRate / closureRateCount;
    // console.log(`Average Weekly Closure Rate: ${averageClosureRate.toFixed(2)}`);
    // console.log('Status Wise Issue Count:', statusWiseIssueCount);


    return {
        statusWiseIssueCount,
        weekStats,
        averageClosureRate,
    }
}

// Example usage
//   const issues: Issue[] = /* Fetch your GitHub issues */;
//   processGitHubIssues(issues);
