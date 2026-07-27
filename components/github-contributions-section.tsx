import { Suspense } from "react";

import {
  GitHubContributions,
  GitHubContributionsFallback,
} from "@/components/github-contributions";
import { getCachedContributions } from "@/lib/get-cached-contributions";

const GITHUB_USERNAME = process.env.GITHUB_USERNAME ?? "yashanand167";
const GITHUB_PROFILE_URL =
  process.env.GITHUB_PROFILE_URL ?? `https://github.com/${GITHUB_USERNAME}`;

export default function GitHubContributionsSection() {
  const contributions = getCachedContributions(GITHUB_USERNAME);

  return (
    <Suspense fallback={<GitHubContributionsFallback />}>
      <GitHubContributions
        contributions={contributions}
        githubProfileUrl={GITHUB_PROFILE_URL}
        className="w-full"
      />
    </Suspense>
  );
}
