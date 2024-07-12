import { Octokit } from "@octokit/rest";
import glob from 'globby' 
import path from 'path'
import { readFile } from 'fs-extra'
import { type NextRequest } from 'next/server'

const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN
})

export async function GET(request: NextRequest) {
  let images;
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('filename')

  if (query) {
    images = await octokit.rest.repos.getContent({
      owner: "patrickpatrickpatrick",
      repo: "sam-site",
      path: `public/img/${query}`
    });
  } else {
    images = await octokit.rest.repos.getContent({
      owner: "patrickpatrickpatrick",
      repo: "sam-site",
      path: "public/img"
    });
  }

  const {
    data
  } = images;

  return Response.json({
    images: data
  })
}