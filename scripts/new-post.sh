#!/bin/bash
# Script to create a new blog post and ensure Jekyll rebuilds properly

# Get the current date
DATE=$(date +%Y-%m-%d)

# Get post title from argument
if [ -z "$1" ]; then
    echo "Usage: ./scripts/new-post.sh \"Your Post Title\""
    exit 1
fi

TITLE="$1"
# Convert title to filename format (lowercase, replace spaces with hyphens)
FILENAME=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | sed 's/[^a-z0-9-]//g')

# Create the post file
POST_FILE="_posts/${DATE}-${FILENAME}.md"

# Create post with front matter
cat > "$POST_FILE" << EOF
---
layout: post
title: "$TITLE"
date: $DATE
categories: []
tags: []
excerpt: ""
---

# $TITLE

Your content here...
EOF

echo "✅ Created new post: $POST_FILE"

# Touch the blog page to ensure Jekyll rebuilds the listing
touch _pages/blog.md
echo "✅ Triggered blog page rebuild"

echo ""
echo "Next steps:"
echo "1. Edit the post: $POST_FILE"
echo "2. Add categories, tags, and excerpt in the front matter"
echo "3. Write your content"
echo "4. The blog page will automatically update!"
