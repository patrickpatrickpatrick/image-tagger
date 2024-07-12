import { Octokit } from "@octokit/rest";
import glob from 'globby' 
import path from 'path'
import { readFile } from 'fs-extra'

const DEFAULT_PAGE_SIZE = 20;

const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN
})

const source = await octokit.rest.repos.getContent({
  owner: "patrickpatrickpatrick",
  repo: "sam-site",
  path: "_data/photos.json"
});

const filterImageByTag = ({ constructedTagString }, tagsQuery) => {
  let result = false;

  while(tagsQuery.length) {
    const tag = tagsQuery.pop();

    if (constructedTagString.match(tag)) {
      result = true;
      break;
    }
  };

  return result;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = (searchParams.get('page') - 1) || 0;
  const tagsQuery = searchParams?.get('tags')?.split(',');

  const {
    data: {
      content    
    }
  } = source;

  const {
    tags, images,
  } = JSON.parse((atob(content)));

  let filterImages = tagsQuery ? 
    images.filter(image => filterImageByTag(image, tagsQuery)) : images

  return Response.json({
    tags,
    images: filterImages
  })
}