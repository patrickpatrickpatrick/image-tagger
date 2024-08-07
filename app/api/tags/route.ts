import { Octokit  } from "@octokit/rest";
import { NextRequest } from "next/server";

const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN
})

export async function GET(request: NextRequest) {
  const source = await octokit.rest.repos.getContent({
    owner: "patrickpatrickpatrick",
    repo: "sam-site",
    path: "_data/photos.json"
  });

  // i dont get it, none of this would work
  // if i couldnt access content?
  const {
    data: {
      content
    }
  } = source;

  const {
    tags
  } = JSON.parse((atob(content)));

  return Response.json({
    tags,
  })
}