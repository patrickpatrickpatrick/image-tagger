import { Octokit } from "@octokit/rest";
import { type NextRequest } from 'next/server'

const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN
})

export async function GET(
  request: NextRequest,
  { params: { filename } }: { params: { filename: string } }
) {
  if (filename) {
    const images = await octokit.rest.repos.getContent({
      owner: "patrickpatrickpatrick",
      repo: "sam-site",
      path: `public/img/${filename}`
    });

    const {
      data
    } = images;
  
    return Response.json({
      images: data
    })      
  }
}
