const GITHUB_API_BASE = 'https://api.github.com';

export const fetchRepoIssues = async (repoName: string) => {
  // get all issues for a repo, not just the open ones. Also noy only the first 30
  // get latest 1000 issues, only 1000 issues can be fetched at a time
  try {
  
    let allIssues = await Promise.all(
      Array(10).fill(0).map(async (_el, i: number) => {
        const response = await fetch(`${GITHUB_API_BASE}/repos/${repoName}/issues?state=all&per_page=100&page=${i+1}`);
        const issues = await response.json();
        return issues;
      })
    )
    
    allIssues = allIssues.flat()
    console.log(allIssues)
    console.log(allIssues.length, 'issues fetched')
    return allIssues
    
    // const result = [];
  

    // for await (let i of Array(10).keys()) {
    //   result.push(...issues);  
    // }
  
    // console.log(result.length, 'issues fetched')
  
    // return result;
  } catch (error: any) {
    console.log(error.message);
    return null
  }
 
};
