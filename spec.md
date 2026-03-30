# Toss Website

## Current State
The site has 3 blog posts in BlogPostPage.tsx and BlogPage.tsx. Content is AI-generated in tone and structure, triggering plagiarism/AI-detection flags in AdSense checkers. Homepage renders dynamically so crawlers see minimal text.

## Requested Changes (Diff)

### Add
- 3 new blog posts (ids 4, 5, 6) with 600+ words each, written in a casual first-person human voice with personal anecdotes, specific real examples, and opinionated takes
- Each post: unique perspective, original insights, not generic listicles

### Modify
- Completely rewrite all 3 existing blog posts to sound genuinely human: personal voice, specific real-world observations, informal phrasing, occasional humor, concrete examples not found in generic AI outputs
- Author changed from "The Toss Team" to specific named authors (e.g. "Alex Rivera", "Sam Patel", "Jordan Kim") with distinct short bios
- BlogPage.tsx post listing must also reflect the 6 posts with updated authors
- BlogPostPage.tsx updated author bio section to reflect the named author and a short personal bio

### Remove
- Nothing

## Implementation Plan
1. Rewrite BlogPostPage.tsx posts array with 6 posts total, all with human-voiced content, named authors, and 600+ word bodies
2. Update BlogPage.tsx posts array to list all 6 posts with matching metadata
3. Update author bio section in BlogPostPage.tsx to show post-specific author name and bio
