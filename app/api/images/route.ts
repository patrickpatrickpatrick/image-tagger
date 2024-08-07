import { Octokit } from "@octokit/rest";
import { type NextRequest } from 'next/server'

const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN
})

const filterImageByTag = (constructedTagString: string, tagsQuery: string[]) => {
  let result = false;

  while(tagsQuery.length) {
    const tag = tagsQuery.pop();

    if (tag && constructedTagString.match(tag)) {
      result = true;
      break;
    }
  };

  return result;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const tagsQuery = searchParams?.get('tags')?.split(',').filter(x => x.length > 0) || [];
  const source = await octokit.rest.repos.getContent({
    owner: "patrickpatrickpatrick",
    repo: "sam-site",
    path: "_data/photos.json"
  });

  let content;

  const { data } = await octokit.repos.getContent();
  if (!Array.isArray(data)) { // Filter out directories
    if (data.type === 'file') { // Make sure it's a file
      content = data.content;
    }
  }

  if (content) {
    const {
      images,
    } = JSON.parse(Buffer.from(content, 'base64').toString());
  
    let filterImages = tagsQuery.length ? 
      images.filter(
        (image: { constructedTagString: string }) => filterImageByTag(image.constructedTagString, tagsQuery)) : images

    return Response.json({
      status: 200,
      images: filterImages
    })
  } else {
    return Response.json({
      status: 400,
    })
  }
}
