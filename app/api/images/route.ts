import { Octokit } from "@octokit/rest";
import glob from 'globby' 
import path from 'path'
import { readFile } from 'fs-extra'

const octokit = new Octokit({
  auth: process.ENV.GITHUB_ACCESS_TOKEN
})

const images = await octokit.rest.repos.getContent({
  owner: "patrickpatrickpatrick",
  repo: "sam-site",
  path: "public/img"
});

export async function GET() {
  const {
    data
  } = images;

  return Response.json({
    images: data
  })
}