import { Octokit } from "@octokit/rest";
import glob from 'globby' 
import path from 'path'
import { readFile } from 'fs-extra'

// remove it
const octokit = new Octokit({
  auth: process.ENV.GITHUB_ACCESS_TOKEN
})

const source = await octokit.rest.repos.getContent({
  owner: "patrickpatrickpatrick",
  repo: "sam-site",
  path: "_data/photos.json"
});

export async function GET() {
  const {
    data: {
      sha,
      content    
    }
  } = source;

  const {
    tags, homeDisplay
  } = JSON.parse((atob(content)));

  return Response.json({
    tags,
    homeDisplay,
  })
}