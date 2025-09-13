# Project Overview

This project is a modern, full-stack portfolio and blog platform built with Vite + React on the frontend and Strapi as the backend CMS. It is designed for developers who want a fast, flexible, and open-source way to manage both personal/portfolio content and a technical blog, with seamless integration of GitHub for content and comments.

## Architecture

- **Frontend:** Vite + React (TypeScript, Tailwind CSS)
- **Backend:** Strapi (Node.js Headless CMS)
- **Content Management:** Blog posts and portfolio content are managed via GitHub Issues and Strapi collections.
- **Comments:** Blog comments are handled using [utterances](https://utteranc.es/), which leverages GitHub Issues for comment threads.

---

## Strapi Backend

Strapi is used as a headless CMS to manage all structured content for the site, including:

- **Single Types:**
	- Home (landing page content, hero, skills, expertise, community impact)
- **Collections:**
	- Projects (portfolio projects, each with tech stack, links, and description)
	- Skills (with nested skill categories and individual skills)
	- Expertise (areas of specialization)
	- Community Impact (community projects, events, or contributions)

Strapi provides a user-friendly admin panel for editing and organizing content. The frontend fetches this data via Strapi's REST or GraphQL API.

### Content Modeling
Each content type is modeled in Strapi as either a single type (for unique pages/sections) or a collection (for repeatable items like projects or skills). Components are used for reusable structures (e.g., tech stack, hero buttons, contact icons).

---

## Blog System (GitHub Issues as CMS)

The blog is powered by GitHub Issues, using the GitHub API to fetch and render posts. Each blog post is a GitHub issue with specific labels (e.g., `type:post`, `state:published`).

- **Content Source:** Blog posts are written and managed as GitHub issues in the repository. Frontmatter in the issue body provides metadata (title, slug, date, image, etc.).
- **Rendering:** The frontend fetches issues via the GitHub API, parses the frontmatter and markdown, and renders them as blog posts.
- **Categories/Tags:** Labels on issues are used for blog categories and filtering.
- **SEO:** Each post uses metadata from the issue frontmatter for SEO and social sharing.

### Blog Post Structure
- **Frontmatter:** Each issue must include a YAML frontmatter block with fields like `title`, `slug`, `date`, `image`, and `readingTime`.
- **Markdown Body:** The rest of the issue body is rendered as the blog post content.

---

## Comments (Utterances)

Comments on blog posts are powered by [utterances](https://utteranc.es/), a lightweight, open-source comments widget that uses GitHub Issues for storage and authentication.

- **How it works:**
	- When a blog post is viewed, utterances searches for a corresponding GitHub issue (by number, pathname, or title).
	- If no issue exists, utterances can create one automatically when a user comments.
	- Users must sign in with GitHub to comment.
	- All comments are stored as GitHub issue comments, so you retain full control and transparency.
- **Setup:**
	- The Utterances GitHub app must be installed on your repo.
	- The repo must be public and have issues enabled.

---

## Development Workflow

1. **Content Editing:**
	 - Use Strapi admin for portfolio, skills, and home page content.
	 - Use GitHub Issues for blog posts (with required labels and frontmatter).
2. **Frontend:**
	 - Built with Vite + React for fast development and hot reloads.
	 - Tailwind CSS for styling.
	 - Fetches data from both Strapi and GitHub APIs.
3. **Comments:**
	 - Utterances widget is embedded in each blog post detail page.
	 - Comments are tied to the corresponding GitHub issue.

---

## Why This Approach?

- **No vendor lock-in:** All content and comments are stored in your own GitHub and Strapi instances.
- **Open source:** All tools and integrations are open and free.
- **Easy collaboration:** Anyone with GitHub access can propose blog posts or comment.
- **Modern stack:** Fast, type-safe, and easy to extend.

---

# Abdirahmansheikhali

Vite + React project structure.

# Strapi Backend Setup

## Overview
- Comments are handled by GitHub Discussions/utteranc.es
- Blog content is managed through GitHub Issues

## Content Structure

### Single Types
- **Home**: Main landing page content

### Collections
- **Projects** (portfolio projects with tech stack)
- **Skills** (with nested skills[])
- **Expertise**
- **CommunityImpact**

## Components Setup

### Global Components

#### 1. TechStack (`techStack`)
- **name**: Text (required)
- **icon**: Text (optional)

### Home Components

#### 1. Hero Button (`heroButton`)
- **Label**: Text (required)
- **Link**: URL string (required)
- **Type**: Enum ["primary", "secondary"] (optional)

#### 2. Contact Icon (`contactIcon`)
- **Platform**: Enum ["GitHub", "LinkedIn", "Email", "Resume", "TikTok", "X/Twitter"] (required)
- **Icon**: Text/Media URL (required)
- **Link**: URL/email string (required)

#### 3. Skill (`skill`)
- **Name**: Text (required)
- **Icon**: Text/Media URL (optional)
- **Number**: Number - proficiency level (optional)

#### 4. Skill Category (`skillCategory`)
- **Category**: Text (required)
- **Category Icon**: Text/Media URL (optional)
- **Skills**: Repeatable skill component (required)

#### 5. Expertise (`expertise`)
- **Icon**: Text/Media URL (optional)
- **Title**: Text (required)
- **Description**: Rich Text (required)
- **Link**: URL string (optional)

#### 6. Community Impact (`communityImpact`)
- **Image**: Media (optional)
- **Description**: Rich Text (required)
- **Location**: Text (required)
- **Date**: Date (required)

## Projects Collection Structure
- **Title**: Text (required)
- **Slug**: Text (required, auto-generated from Title)
- **Thumbnail**: Media (required)
- **description**: Text (required)
- **GitHubLink**: Text (optional)
- **LiveLink**: Text (optional)
- **techStack**: Repeatable Component (`TechStack`)

## Home Single Type Structure

### Hero Section
- **Images**: Media (repeatable - slider images)
- **Intro**: Text (required)
- **Tagline**: Text (required)
- **Bio**: Rich Text (required)
- **CTA Primary**: heroButton component
- **CTA Secondary**: heroButton component
- **Contact Icons**: Repeatable contactIcon component

### Skills Section
- **Techskills**: Repeatable skillCategory component

### Expertise Section
- **Expertise**: Repeatable expertise component

### Community Impact Section
- **Community**: Repeatable communityImpact component
